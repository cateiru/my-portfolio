import { NowRequest, NowResponse } from '@vercel/node'
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'querystring'

interface Text {
  name: string,
  title: string,
  mail: string,
  text: string,
  date: string
}

type Fn = (req: NowRequest, res: NowResponse) => Promise<void>

const allowCors = (fn: Fn) => async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function handler(req: NowRequest, res: NowResponse) {
  let status = 400
  if (req.method === 'POST'){
    const getData: Text = req.body
    status = await sendDiscord(getData)
  }
  res.setHeader("content-type", "application/json")
  res.status(status)
  res.end()
}

async function sendDiscord(data: Text): number{
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

  let status = 200

  try{
    const response = await axios.request(config)
    console.log(response)
  }catch(error) {
    status = 500
  }

  return status

}

export default allowCors(handler)

