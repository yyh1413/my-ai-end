
const util = require('../../utils/util')
const { Configuration, OpenAIApi } = require("openai");
const https = require("https");
const axios = require('axios').default;
const HttpsProxyAgent = require("https-proxy-agent");
const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`);

const apikey = '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'
const parans = {
  model: "text-davinci-003",
  prompt: "给我讲个笑话",
  max_tokens: 200,
  top_p: 1,
  temperature: 0.5,
  frequency_penalty: 0,
  presence_penalty: 0,
}

const client = axios.create({
  proxy: false,
  httpsAgent,
  headers: {
    "Authorization": 'Bearer ' + apikey
  }
})

// function getAiData() {
//   return new Promise(function (resolve, reject) {
//     client.post("https://api.openai.com/v1/completions", parans)
//       .then(result => {
//         console.log(result.data.choices);
//         resolve(result.data.choices[0].text)
//       }).catch(e => {
//         reject(e)
//       })
//   })
// }


async function getAiData(param) {

  const configuration = new Configuration({
    apiKey: apikey,
  });
  const openai = new OpenAIApi(configuration, undefined, client);

  const completion = await openai.createCompletion(parans);
  console.log(completion.data.choices[0].text);
  //增加数据
  return completion.data.choices[0].text
}
getAiData();

module.exports = { getAiData }