import { NextApiRequest, NextApiResponse } from "next"
import axios, { AxiosRequestConfig } from 'axios'
import { GithubGetData, SendData, language,
         sendDataCalendar, sendDataCalendarDays } from '../../utils/githubData'

let lastGetDate: number | undefined

let cacheData: SendData | undefined

const token = process.env.GITHUB_TOKEN


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 400
  let data: GithubGetData | undefined
  let formattedData: SendData | undefined

  if (await checkCache() || typeof cacheData === 'undefined') {
    data = await getGithub()
    formattedData = await format(data)

    cacheData = formattedData
    status = 200

  }else {
    formattedData = cacheData
    status = 200
  }

  res.setHeader("content-type", "application/json")
  res.status(status)
  res.json(formattedData)
}

/**
 * 過去に取得した日時を確認してそれが1日以上前の場合true、それ以外をfalseで返します。
 */
async function checkCache(): Promise<boolean> {
  const now = Date.now()

  if (86400 < (now - lastGetDate)){
    lastGetDate = now
    return true
  }
  return false
}

/**
 * Github Graph QL api を使用してデータを取得
 */
async function getGithub(): Promise<GithubGetData | undefined> {
  const data = {
    query: `
    query {
      user(login: "yuto51942") {
        contributionsCollection {
          contributionCalendar {
            isHalloween
            totalContributions
            weeks {
              firstDay
              contributionDays {
                contributionLevel
                date
                weekday
              }
            }
          }
        }
        repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
          nodes {
            name
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  color
                  name
                }
              }
            }
          }
        }
      }
    }
    `
  }

  try{
    const response = await axios({
      method: "post",
      url: "https://api.github.com/graphql",
      data,
      headers: {
        Authorization: `bearer ${token}`,
      }
    })

    return response.data
  }catch(error) {
    return
  }
}

async function format(githubData: GithubGetData): Promise<SendData> {
  const weeks: sendDataCalendar[] = []
  let languages: language[] = []

  // 草グラフの整形
  for(const week of githubData.data.user.contributionsCollection.contributionCalendar.weeks) {
    const days: sendDataCalendarDays[] = []

    for(const day of week.contributionDays) {
      const level = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].indexOf(day.contributionLevel) as 0 | 1 | 2 | 3
      // 2020-02-11 -> 02

      days.push({
        contributionLevel: level,
        date: day.date,
        weekday: day.weekday as 0 | 1 | 2 | 3 | 4 | 5 | 6
      })

    }

    weeks.push({
      firstDay: week.firstDay,
      days: days
    })
  }

  // languageの整形
  for(const repos of githubData.data.user.repositories.nodes) {

    for(const langs of repos.languages.edges) {
      const langIndex = languages.findIndex(e => e.langName === langs.node.name)

      if(langIndex === -1) {
        languages.push({
          langName: langs.node.name,
          useRepoCount: 1,
          rank: 0,
          allSize: langs.size
        })
      }else {
        languages[langIndex].useRepoCount++
        languages[langIndex].allSize += langs.size
      }
    }
  }

  // 順位づけ
  let totalSize = 0

  languages.sort((a, b) => {
    if(a.allSize > b.allSize) return -1;
    if(a.allSize < b.allSize) return 1;
  })

  languages.map((element, index) => (element.rank = index+1))



  return {
    totalContributions: githubData.data.user.contributionsCollection.contributionCalendar.totalContributions,
    isHalloween: githubData.data.user.contributionsCollection.contributionCalendar.isHalloween,
    calendar: {
      weeks: weeks
    },
    languages: languages
  }
}
