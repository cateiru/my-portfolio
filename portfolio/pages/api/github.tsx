import { NextApiRequest, NextApiResponse } from "next"
import { GithubGetData, SendData, checkCache, getGithub, format } from '../../utils/githubData'

let cacheData: SendData | undefined


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
