import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api/auth";

//Register
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

//Login
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

//Get logged-in User
export const getUser = async () => {
  const token = getToken();

  const response = await axios.get(`${API_URL}/user`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

