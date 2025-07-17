const axios = require('axios');
require('dotenv').config();

async function summarizeFXData(promptText) {
  try {
    const tokenRes = await axios.post(
      "https://iam.cloud.ibm.com/identity/token",
      new URLSearchParams({
        "apikey": process.env.WATSONX_API_KEY,
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey"
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenRes.data.access_token;

    const promptPayload = {
      "model_id": "google/flan-ul2",
      "input": promptText,
      "parameters": { "temperature": 0.5 }
    };

    const res = await axios.post(
      `https://jp-tok.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`,
      {
        ...promptPayload,
        "project_id": process.env.WATSONX_PROJECT_ID
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return res.data.results[0].generated_text;
  } catch (err) {
    console.error("Error summarizing FX data:", err.response?.data || err.message);
    return "Unable to generate AI summary at this time.";
  }
}

module.exports = summarizeFXData;
