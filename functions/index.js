const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const lotteryRoute = require('./routes/lotteryRoute.js')

const app = express()

mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useUnifiedTopology:false
})
.then(()=>console.log("connect database success"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(cors())

app.use('/api', lotteryRoute)

exports.app = functions.region('asia-southeast1').https.onRequest(app)

exports.myCallable = functions.region('asia-southeast1').https.onCall(async (data, context) => {
  const base64 = data.base64.split(",")

  const vision = require('@google-cloud/vision')
  const client = new vision.ImageAnnotatorClient({ keyFilename: './service-account.json' })
  const request = { image: { content: base64[1] } }
  const [result] = await client.textDetection(request)
  const detections = result.fullTextAnnotation.text
  const datas = {}

  detections.split('\n').forEach((row) => {
    let items = row.split(' ')

    const lottery = items.join('')
    if (isLottery(lottery)){
      datas.lottery = lottery
    }

  })

  return {
    result: detections
  }
})

function isLottery(lottory){
    const regex = /^\d{6}$/;
    return regex.test(lottory);
}