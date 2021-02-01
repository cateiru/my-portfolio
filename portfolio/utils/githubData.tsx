export interface SendData {
  totalContributions: number
  isHalloween: boolean

  calendar: {
    weeks: {
      firstDay: string
      isMonthStart: boolean

      days: {
        contributionLevel: 0 | 1 | 2 | 3 | 4
        date: string
        weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6
      }[]
    }[]
  }

  languages: {
    langName: string
    useRepoCount: number
    ratio: number
    rank: number
    allSize: number
  }[]
}

export interface GithubGetData {
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

// this object is GraphQL
//
// endpoint: https://api.github.com/graphql
//
// query {
// 	user(login: "yuto51942") {
// 		contributionsCollection {
//       contributionCalendar {
//         isHalloween
//         totalContributions
//         weeks {
//           firstDay
//           contributionDays {
//             contributionLevel
//             date
//             weekday
//           }
//         }
//       }
//     }
//     repositories(ownerAffiliations: OWNER isFork: false first: 100) {
//       nodes {
//         name
//         languages(first: 10, orderBy: {field: SIZE direction: DESC}) {
//           edges {
//             size
//             node {
//               color
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// }

