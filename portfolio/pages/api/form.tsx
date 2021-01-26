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
  let status = 500
  if (req.method === 'POST'){
    const getData: Text = req.body
    sendDiscord(getData)
    status = 200
  }

  res.setHeader("content-type", "application/json")
  res.status(status)
  res.end()
}

async function sendDiscord(data: Text){
  const lineTokenURL = 'https://notify-api.line.me/api/notify'
  const token = process.env.LINE_TOKEN

  const text = `【新着問い合わせ】
* お名前: ${data.name}
* メールアドレス: ${data.mail}
* 送信日時: ${data.date}
* 内容
${data.text}
  `

  console.log(text)
  console.log(token)

  const config: AxiosRequestConfig = {
    url: lineTokenURL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
    },
    data: qs.stringify({
      message: text
    })
  }

  axios.request(config)
    .then((res) => {
      console.log(res.status)
    })
    .catch((error) => {
      console.log(error)
    })
}

