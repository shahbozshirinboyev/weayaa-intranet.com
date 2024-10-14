import axios from "axios";

const http = axios.create({
    baseURL: 'https://weayaa-intranet.com/api/'
  });

export default http;