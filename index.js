import { ChatGPTAPI } from 'chatgpt';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import bodyParser from 'body-parser';
import cors from 'cors';

import express from 'express';
const app = express();

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
  }

})

app.listen(3466, () => console.log('App listening on 3466'));