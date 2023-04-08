const { Configuration, OpenAIApi } = require("openai");

const generateImg = async (prompt, openAIKey) => {
  // configuring open ai by passing openAiKey
  const configuration = new Configuration({
    apiKey: openAIKey,
  });
  // creating an openAI instance from class OpenAIApi
  const openai = new OpenAIApi(configuration);

  try {
    imgSize = "1024x1024";
    const res = await openai.createImage({
      prompt,
      n: 1,
      size: imgSize,
    });
    const imageUrl = res.data.data[0].url;
    return imageUrl;
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }
};

module.exports = { generateImg };
