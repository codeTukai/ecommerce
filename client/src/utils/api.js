import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// ✅ POST function
export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("POST request failed:", error);
    return { error: "Request failed" };
  }
};

// ✅ GET function using axios
export const fetchDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) throw new Error("No token found");

    const { data } = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error("Axios Error:", error.response?.data || error.message);
    return { error: true, message: error.response?.data?.message || "Unauthorized" };
  }
};


export const editData = async (url, data, config = { withCredentials: true }) => {
  try {
    const response = await axios.put(apiUrl + url, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error?.response?.data?.message || "Something went wrong.",
    };
  }
};


// src/utils/api.js

export const uploadImage = async (url, formData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(import.meta.env.VITE_API_URL + url, {
      method: "PUT",
      body: formData,
      credentials: "include", // ✅ sends cookies if any
      headers: {
        Authorization: `Bearer ${token}`, // ✅ send token
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Image upload failed: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    console.error("uploadImage error:", error);
    throw new Error("Image upload failed");
  }
};







