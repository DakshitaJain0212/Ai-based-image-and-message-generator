import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";
// import { v2 as cloudinary } from 'cloudinary';

// import message from '../mongodb/models/message';

dotenv.config();

const router = express.Router();
// import OpenAI from  "openai";

const configuration = new Configuration({
  // organization: "org-3nlSOZG3Zhy38vczjpFaunnj",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').post(async (req, res) => {
  try{
    const que=req.body.message;
    console.log(req.body.message);
  console.log(openai.axios.create);
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: que,
      max_tokens: 30,
    });
    console.log("==>",completion.choices[0])

    res.status(200)
    .json({
        message:"successfully got response",
        result:completion.choices[0].text
    })
}
catch(err)
{ 
    res.status(500).json({
        error:err.message
    })

}
});

// router.route('/').post(async (req, res) => {
//   try {
//     const { name, prompt, photo } = req.body;
//     const photoUrl = await cloudinary.uploader.upload(photo);

//     const newPost = await Post.create({
//       name,
//       prompt,
//       photo: photoUrl.url,
//     });

//     res.status(200).json({ success: true, data: newPost });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
//   }
// });

export default router;
