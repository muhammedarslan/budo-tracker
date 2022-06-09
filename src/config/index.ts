import env from "dotenv";

// Setup .env
env.config();

export default {
  timeInterval: Number(process.env.timeInterval) ?? 3000,
  smsUser: process.env.SMSUser,
  smsPass: process.env.SMSPass,
  smsTitle: process.env.smsTitle,
  smsTo: process.env.smsTo,
  proxyIP: process.env.proxyIP ?? "__",
  proxyPort: Number(process.env.proxyPort),
  proxyUser: process.env.proxyUser ?? "__",
  proxyPass: process.env.proxyPass ?? "__",
};
