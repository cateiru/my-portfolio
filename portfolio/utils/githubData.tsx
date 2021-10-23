import axios from 'axios'

const token = process.env.GITHUB_TOKEN

let lastGetDate: number | undefined

export interface SendData {
  totalContributions: number
  isHalloween: boolean

  calendar: {
    monthIndex: number[]
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
  contributionCount: number
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
              contributionCount: number
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
    } | null
  }
}


export async function github(userName: string): Promise<SendData|null> {
  const data = await getGithub({login: userName})
  if(data.data.user){
    const formattedData = await format(data)

    return formattedData
  }
  return null
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
export async function getGithub(variables: {login: string}): Promise<GithubGetData | undefined> {
  const data = {
    query: `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            isHalloween
            totalContributions
            weeks {
              firstDay
              contributionDays {
                contributionLevel
                contributionCount
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
    `,
    variables,
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

    return response.data as GithubGetData
  }catch(error) {
    throw new Error(error)
  }
}

export async function format(githubData: GithubGetData): Promise<SendData | null> {
  const weeks: sendDataCalendar[] = []
  let languages: language[] = []
  let monthIndex: number[] = []
  let startMonth = 1
  let alreadyStartIndex = false

  if(typeof githubData === 'undefined') {
    return null
  }

  // 草グラフの整形
  githubData.data.user.contributionsCollection.contributionCalendar.weeks.forEach((week, index) => {
    const days: sendDataCalendarDays[] = []

    // 2020-02-11 ->[2020, 02, 11]
    const date = week.firstDay.split('-').map((e) => parseInt(e))

    if(date[2] <= 7){
      monthIndex.push(index)

      if(!alreadyStartIndex){
        startMonth = date[1]
        alreadyStartIndex = true
      }
    }

    week.contributionDays.forEach((day, _) => {
      const level = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE']
                    .indexOf(day.contributionLevel) as 0 | 1 | 2 | 3

      days.push({
        contributionLevel: level,
        contributionCount: day.contributionCount,
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
      startMonth: startMonth -1,
      monthIndex: monthIndex,
      weeks: weeks
    },
    languages: languages
  }
}
