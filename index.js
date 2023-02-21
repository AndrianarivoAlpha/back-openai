import { ChatGPTAPI } from 'chatgpt';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import bodyParser from 'body-parser';
import cors from 'cors';

import express from 'express';
const app = express();

import  { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})


app.post('/', async (req, res) => {
  const question = req.body.question;

  if (question) {
    const response = await api.sendMessage(question)
    res.status(200).send(response.text)
  } else {
    const response = await api.sendMessage("No question, just kidding!")
    res.status(200).send(response.text)
  }

})

app.get('/imagegenerator', async (req, res) => {
  const response = await openai.createImage({
    prompt: "Four black geese",
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = response.data.data[0].url;

  console.log(imageUrl);
})

app.listen(3466, () => console.log('App listening on 3466'));