import axios from "axios";
import { useState } from "react";
// const token = localStorage.getItem("user");
// const userId = localStorage.getItem("userId");

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("user"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
      userId: userId,
    },
  });
  if (token && userId) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["userId"] = userId;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["userId"];
  }
  return { setToken, setUserId, axiosInstance, token };
};
