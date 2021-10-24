import axios from "axios";
import { API } from "../backend";
export const signin = (user) => {
  return axios
    .post(`${API}/signin`, user)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const signup = (user) => {
  return axios
    .post(`${API}/signup`, user)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("location")) {
    if (sessionStorage.getItem("jwt")) {
      return JSON.parse(sessionStorage.getItem("jwt"));
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const signOut = (next) => {
  if (typeof window == "undefined") {
    return false;
  }
  sessionStorage.removeItem("jwt");
  next();
};

export const authenticated = (data, next) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const fetchAllLocation = () => {
  return axios
    .get(`${API}/location`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
