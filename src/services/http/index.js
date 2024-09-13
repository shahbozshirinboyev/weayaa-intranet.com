import axios from "axios";

const http = axios.create({
    baseURL: 'https://weayaaworks.com/api/'
  });

export default http;