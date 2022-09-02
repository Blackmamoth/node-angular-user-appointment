const asyncHanlder = require("express-async-handler");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendApiKeys = asyncHanlder(async (req, res) => {
  const { to, text } = req.body;
  const message = await twilioClient.messages.create({
    body: text,
    from: process.env.PHONE_NUMBER,
    to: to,
  });
  sleep(1000);
  if ((await message.status) === "queued") {
    res.status(200).json({
      success: true,
      message: "Sms has successfully been sent to the user",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "We encountered some problem while sending the sms",
    });
  }
});

module.exports = { sendApiKeys };
