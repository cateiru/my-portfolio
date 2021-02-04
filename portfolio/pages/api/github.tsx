import { NextApiRequest, NextApiResponse } from "next"
import { github, SendData, getGithub, format } from '../../utils/githubData'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let formattedData: SendData | null = null

  if(typeof req.query.name === 'string'){
    formattedData = await github(req.query.name)
  }

  res.setHeader("content-type", "application/json")

  if(!formattedData){
    res.status(400)
    res.end()
  }else{
    res.status(200)
    res.json(formattedData)
  }
}
