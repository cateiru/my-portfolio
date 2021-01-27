import { NextApiRequest, NextApiResponse } from "next"
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'querystring'
import { isIP } from "net"

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
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    status = await sendDiscord(getData, ip)
  }

  res.setHeader("content-type", "application/json")
  res.status(status)
  res.end()
}

async function sendDiscord(data: Text, ip: string[] | string): Promise<number>{
  const token = process.env.DISCORD_TOKEN
  if(typeof ip !== 'string'){
    ip = ip.join(' ')
  }

  const text = `【新着問い合わせ】
* お名前: ${data.name}
* メールアドレス: ${data.mail}
* 送信日時: ${data.date}
* IPアドレス: ${ip}
------
${data.title}

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
