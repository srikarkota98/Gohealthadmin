import axios from "axios";

const BASE_URL =

    "https://api.gohelth.com/";
    // "https://jtc8t9wg-3020.inc1.devtunnels.ms/"
    // "https://h37s8bp6-3020.inc1.devtunnels.ms/";
    // "https://zvz8c6j8-3020.inc1.devtunnels.ms/";
    // "https://h37s8bp6-3020.inc1.devtunnels.ms/"

    // "https://h37s8bp6-3020.inc1.devtunnels.ms/"
    // "http://localhost:3000/"

// const TOKEN = "your_bearer_token_here"; // replace this /ith your actual token

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        // Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    },
});

export default api;