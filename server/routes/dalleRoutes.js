import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import pkg from 'body-parser';
const {json, urlencoded} = pkg;
dotenv.config();

const router = express.Router();

router.use(json());
router.use(urlencoded({ extended: true }));

const configuration = new Configuration({
  // organization: "org-3nlSOZG3Zhy38vczjpFaunnj",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from DALLE");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(req.body);
    if (!prompt) {
      return res.status(400).send("Missing prompt parameter");
    }

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message  || 'Something went wrong');
  }
});

export default router;
