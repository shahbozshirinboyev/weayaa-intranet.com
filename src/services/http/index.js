import axios from "axios";

const http = axios.create({
    baseURL: 'https://composed-daily-primate.ngrok-free.app/api'
  });

export default http;