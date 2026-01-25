import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// ✅ POST function
export const postData = async (url, formData, includeToken = true) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (includeToken) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return {
        ...data,
        error: true,
        success: false,
        message: data?.message || "Request failed",
      };
    }
  } catch (error) {
    console.error("POST request failed:", error);
    return {
      error: true,
      success: false,
      message: error.message || "Request failed",
    };
  }
};


// ✅ GET function using axios

const DISABLE_FETCH = false; // ✅ Disable all API calls for debugging

export const fetchDataFromApi = async (url, includeToken = true) => {
  if (DISABLE_FETCH) {
    console.warn("⚠️ fetchDataFromApi is DISABLED via DISABLE_FETCH flag.");
    return { error: true, message: "Fetch is disabled." };
  }

  if (!apiUrl) {
    console.error("❌ VITE_API_URL is not defined.");
    return { error: true, message: "API base URL is missing." };
  }

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (includeToken) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token missing. Please login again.");
      }
      headers.Authorization = `Bearer ${token}`;
    }

    const { data } = await axios.get(apiUrl + url, {
      headers,
      withCredentials: true, // include cookies if needed
    });

    return data;
  } catch (error) {
    console.error("Axios Error:", error?.response?.data || error?.message);
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong.",
    };
  }
};



export const editData = async (url, data, config = {}) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.put(apiUrl + url, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(config.headers || {}),
      },
      withCredentials: true, // Ensures cookies/session if needed
    });

    return response.data;
  } catch (error) {
    console.error("Edit request failed:", error);

    return {
      error: true,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong.",
    };
  }
};


// src/utils/api.js
export const uploadImage = async (url, formData) => {
  const token = localStorage.getItem("accessToken");

  // Step 1: Validate VITE_API_URL and the url argument
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    throw new Error("VITE_API_URL is not defined in .env file.");
  }

  if (!url || typeof url !== "string") {
    throw new Error("uploadImage requires a valid `url` string.");
  }

  const fullUrl = baseUrl + url;

  // Optional debug log
  console.log("uploadImage ➜", fullUrl);

  // Step 2: Display what’s being uploaded
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData — the browser will handle it
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} - ${JSON.stringify(result)}`);
    }

    return result;
  } catch (err) {
    console.error("uploadImage error:", err);
    throw err;
  }
};




// utils/api.js

export const deleteData = async (url, data = null) => {
  const token = localStorage.getItem("accessToken");

  const baseUrl = import.meta.env.VITE_API_URL;
  const fullUrl = baseUrl + url;

  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  if (data) {
    config.body = JSON.stringify(data); // ✅ attach body when needed
  }

  const response = await fetch(fullUrl, config);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Delete request failed");
  }

  return result;
};



export const deleteImages = async (url) => {
  const token = localStorage.getItem("accessToken");
  const fullUrl = apiUrl + url;

  try {
    const response = await axios.delete(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("deleteImages error:", error);
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Image deletion failed",
    };
  }
};
