import { NextApiRequest, NextApiResponse } from "next"
import { GithubGetData, SendData, getGithub, format } from '../../utils/githubData'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 400
  let data: GithubGetData | undefined
  let formattedData: SendData | {} = {}

  if(typeof req.query.name === 'string'){
    data = await getGithub({login: req.query.name})
    formattedData = await format(data)
    status = 200
  }

  res.setHeader("content-type", "application/json")
  res.status(status)
  res.json(formattedData)
}
