import axios from "axios";

const LOCAL_BASE_URL = "http://192.168.23.44:9000/task/"; 

const userToken = localStorage.getItem("accessToken");
const token = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + `${userToken}`,
  },
};

export const getLoginAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE_URL}login`, data);
}

export const createUserAPI = async (formData) => {
  return await axios.post(`${LOCAL_BASE_URL}register`, formData);
}
export const getUserAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE_URL}users-list`, data);
}
export const delUserAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE_URL}users-delete`, data);
}

