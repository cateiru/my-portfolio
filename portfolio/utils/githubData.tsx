import axios from 'axios'


let lastGetDate: number | undefined

let cacheData: SendData | undefined

const token = process.env.GITHUB_TOKEN

export interface SendData {
  totalContributions: number
  isHalloween: boolean

  calendar: {
    startIndex: number
    startMonth: number
    weeks: sendDataCalendar[]
  }

  languages: language[]
}

export interface language {
  langName: string
  langColor: string
  useRepoCount: number
  rank: number
  allSize: number
}

export interface sendDataCalendar {
    firstDay: string
    days: sendDataCalendarDays[]
}

export interface sendDataCalendarDays {
  contributionLevel: 0 | 1 | 2 | 3 | 4
  date: string
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface GithubGetData {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          isHalloween: boolean
          totalContributions: number
          weeks: {
            firstDay: string
            contributionDays: {
              contributionLevel: string
              date: string
              weekday: number
            }[]
          }[]
        }
      }
      repositories: {
        nodes: {
          name: string
          languages: {
            edges: {
              size: number
              node: {
                color: string
                name: string
              }
            }[]
          }
        }[]
      }
    }
  }
}


export async function github() {
  let data: GithubGetData | undefined
  let formattedData: SendData | undefined

  if (await checkCache() || typeof cacheData === 'undefined') {
    data = await getGithub()
    formattedData = await format(data)

    cacheData = formattedData

  }else {
    formattedData = cacheData
  }

  return formattedData
}

/**
 * 過去に取得した日時を確認してそれが1日以上前の場合true、それ以外をfalseで返します。
 */
export async function checkCache(): Promise<boolean> {
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
export async function getGithub(): Promise<GithubGetData | undefined> {
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

export async function format(githubData: GithubGetData): Promise<SendData | undefined> {
  const weeks: sendDataCalendar[] = []
  let languages: language[] = []
  let startIndex = 0
  let startMonth = 1
  let alreadyStartIndex = false

  if(typeof githubData === 'undefined') {
    return
  }

  // 草グラフの整形
  githubData.data.user.contributionsCollection.contributionCalendar.weeks.forEach((week, index) => {
    const days: sendDataCalendarDays[] = []

    // 2020-02-11 ->[2020, 02, 11]
    const date = week.firstDay.split('-').map((e) => parseInt(e))

    if(!alreadyStartIndex && date[2] < 7){
      startIndex = index
      startMonth = date[1]
      alreadyStartIndex = true
    }

    week.contributionDays.forEach((day, _) => {
      const level = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE']
                    .indexOf(day.contributionLevel) as 0 | 1 | 2 | 3

      days.push({
        contributionLevel: level,
        date: day.date,
        weekday: day.weekday as 0 | 1 | 2 | 3 | 4 | 5 | 6
      })

    })

    weeks.push({
      firstDay: week.firstDay,
      days: days
    })
  })

  // languageの整形
  for(const repos of githubData.data.user.repositories.nodes) {

    for(const langs of repos.languages.edges) {
      const langIndex = languages.findIndex(e => e.langName === langs.node.name)

      if(langIndex === -1) {
        languages.push({
          langName: langs.node.name,
          useRepoCount: 1,
          rank: 0,
          langColor: langs.node.color,
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
      startIndex: startIndex,
      startMonth: startMonth -1,
      weeks: weeks
    },
    languages: languages
  }
}
