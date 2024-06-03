import axios from 'axios';


export async function POST(req, res) {
  const { text } = await req.json(); // Use req.json() to parse the request body
  const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY_OWNER_SCOPE
  const MODEL_NAME = 'alpha-stella-en-v2'; // Example model name

  const DEEPGRAM_URL = `https://api.deepgram.com/v1/speak?model=${MODEL_NAME}&performance=some&encoding=linear16&sample_rate=24000`; 

  //try {
    const response = await axios.post(DEEPGRAM_URL, { text, voice: MODEL_NAME }, {//read more about it
      headers: {
        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer', // Important for receiving audio data as a binary stream
    });
    console.log(response)
    res.setHeader('Content-Type', 'audio/wav');
    return response.data

  //} catch (error) {
   // console.error('Error:', error.response ? error.response.data : error.message);
   // res.status(500).json({ message: 'Internal Server Error' });
 // }
}