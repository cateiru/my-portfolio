import { NextApiRequest, NextApiResponse } from "next"
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'querystring'

interface Text {
  name: string,
  title: string,
  mail: string,
  text: string,
  date: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 400
  if (req.method === 'POST'){
    const getData: Text = req.body
    status = await sendDiscord(getData)
  }

  res.setHeader("content-type", "application/json")
  res.status(status)
  res.end()
}

async function sendDiscord(data: Text): Promise<number>{
  const token = process.env.DISCORD_TOKEN

  const text = `【新着問い合わせ】
* お名前: ${data.name}
* メールアドレス: ${data.mail}
* 送信日時: ${data.date}
* 内容
${data.text}
  `

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
  }

  const postData = {
    content: text
  }

  let status = 200

  try{
    const response = await axios.post(token, postData, config)
  }catch(error) {
    status = 500
  }

  return status
}
