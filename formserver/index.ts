import express from 'express'
import handler from './api/index'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())

// app.get('/', handler as any)
app.post('/', handler as any)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
