const express = require("express");
const app = express();
const dotenv = require("dotenv");

const TelegramBot = require("node-telegram-bot-api");
const { generateImg } = require("./openAICont");

// middlewares
app.use(express.json());
dotenv.config();

// creating instance of the telegram bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// later authenticate with firebase
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  bot.sendMessage(chatId, "Loading...");

  // getting the img url from the open ai by passing text and key for open ai account
  const imgUrl = await generateImg(text, process.env.OPEN_AI_KEY);

  // sending a text and img back to the telegram bot
  if (imgUrl) {
    bot.sendMessage(chatId, text);
    bot.sendPhoto(chatId, imgUrl);
  }
});

app.listen(process.env.PORT || 6000, () => {
  console.log("Server started at port " + process.env.PORT);
});
