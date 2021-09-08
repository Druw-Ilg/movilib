import axios from "axios";

//base url for movie requests
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
