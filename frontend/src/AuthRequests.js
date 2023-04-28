import axios from "axios";

const API = axios.create({ baseURL: "https://hangman-app.up.railway.app/user/" });

export const logIn = (formData) => API.post("/user/login", formData);
export const updateScore = (formData) => API.post("/user/updateScore", formData);
export const leaderboardData = () => API.get("/user/leaderboard");
