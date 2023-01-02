const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const {Configuration, OpenAIApi} = require("openai");


dotenv.config();
app.use(cors());

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


app.post('/generate', async(req, res) => {
    function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
        return `suggest 3 Christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} years old ${gender} that is into ${hobbies}.`;
      }
    const { priceMin, priceMax, gender, age, hobbies } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(priceMin, priceMax, gender, age, hobbies),
    temperature: 0.6,
    max_tokens: 2048,
  });
  console.log(completion.data.choices[0].text)
  res.status(200).json({ result: completion.data.choices[0].text });
}
);


app.listen(8000, () => {
    console.log('Server started on port 8000');
}
);




