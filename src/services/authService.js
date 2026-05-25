import api from "../api.js";


export const loginUser = async () => {
  const response = await api.get("/testing");
    
  return response.data;
};

