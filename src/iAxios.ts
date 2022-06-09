import config from "./config";
import axios from "axios";

const iAxios = axios.create({
  proxy: {
    host: config.proxyIP,
    port: config.proxyPort,
    auth: {
      username: config.proxyUser,
      password: config.proxyPass,
    },
  },
});

export default iAxios;
