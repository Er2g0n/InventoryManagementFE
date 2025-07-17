import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse
} from "axios";
import {
  setupCache,
  buildWebStorage,
  CacheInstance
} from "axios-cache-interceptor";
import type { AxiosRequestConfig } from "axios";
import { CacheAxiosResponse, CacheProperties } from "axios-cache-interceptor";
import { ResultService } from "@/types/Base/ResultService";
// Create axios instance with default config
const axiosInstance: AxiosInstance & CacheInstance = setupCache(
  axios.create({
    baseURL: "/api",
    timeout: 300000, // 30 seconds
    headers: {
      
      Accept: "application/json"
    }
  }),
  {
    storage: buildWebStorage(sessionStorage, "my-cache:"), // Sử dụng SessionStorage
    ttl: 1000 * 60 * 120, // Mặc định không cache
    methods: ["get"], // Chỉ cache GET requests
    interpretHeader: true //  tự động đọc headers cache từ server
  }
);

// Request interceptor to add user and client info to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Interceptor - Data type:", config.data instanceof FormData ? "FormData" : typeof config.data);
    console.log("Interceptor - Headers:", config.headers);
    // Xử lý Content-Type cho FormData
    if (config.data instanceof FormData) {
      // Không đặt Content-Type, để trình duyệt tự động đặt multipart/form-data
      config.headers["Content-Type"] = undefined;
    } else {
      // Đặt Content-Type: application/json cho các yêu cầu không phải FormData
      config.headers["Content-Type"] = "application/json";
    }
    // Only modify the body for POST, PUT, PATCH requests
    if (
      config.method?.toLowerCase() === "post" ||
      config.method?.toLowerCase() === "put" ||
      config.method?.toLowerCase() === "patch"
    ) {
      // Get the original data
      // const originalData = config.data;

      // Create the new structure
      // config.data = {
      //   user: "currentUser", // Replace with actual user info
      //   client: "webClient", // Replace with actual client info
      //   data: originalData, // The original data
      // }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      console.error(`Error with status code: ${status}`);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error);
  }
);


export type myAxiosRequestConfig = AxiosRequestConfig & {
  cache?: boolean | Partial<CacheProperties<CacheAxiosResponse, unknown>>;
};
// Generic fetch function that handles all HTTP methods
export const fetchClient = async <T, D = any>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: D,
  config?: myAxiosRequestConfig
): Promise<ResultService<T>> => {
  try {
    let response;
    const myConfig = { cache: false, ...config } as myAxiosRequestConfig;
    if (data instanceof FormData) {
      myConfig.headers = {
        ...myConfig.headers,
        "Content-Type": undefined,
      };
    }
    switch (method) {
    case "GET":
      // add logic isactice memory cache
      if (myConfig.cache) {
        delete myConfig.cache;
      }
      // end logic unactive memory cache
      response = await axiosInstance.get<
          ResultService<T>,
          CacheAxiosResponse<ResultService<T>>
        >(url, myConfig);

      break;
    case "POST":
      response = await axiosInstance.post<
          ResultService<T>,
          CacheAxiosResponse<ResultService<T>>
        >(url, data, config);
      break;
    case "PUT":
      response = await axiosInstance.put<
          ResultService<T>,
          CacheAxiosResponse<ResultService<T>>
        >(url, data, config);
      break;
    case "DELETE":
      response = await axiosInstance.delete<
          ResultService<T>,
          CacheAxiosResponse<ResultService<T>>
        >(url, {
          ...config,
          data // For DELETE requests, data needs to be passed as config.data
        });
      break;
    case "PATCH":
      response = await axiosInstance.patch<
          ResultService<T>,
          CacheAxiosResponse<ResultService<T>>
        >(url, data, config);
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}:`, error);
    throw error;
  }
};

// import axios from "axios";
// import type { ResultService } from "../types/Base/ResultService";

// async function fetchAPIAsync<T>(
//   url: string,
//   method: string,
//   data?: T,
//   isAuthenticated: boolean = false,
// ): Promise<ResultService<T>> {
//   try {
//     const response: ResultService<T> = {
//         code: "-1",
//         message: "",
//         data: null as T,
//     }

//     const headers: Record<string, string> = {};
//     if (isAuthenticated) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else {
//         response.message='Authentication token not found';
//         return response;
//       }
//     }
//     const result  = await axios({
//       url,
//       method,
//       data,
//       headers,
//     });
//     if (result.status !== 200) {
//       response.code = "-1";
//       response.message = result.statusText;
//       return response;
//     }
//     response.code = "0";
//     response.data = result.data.data;
    

//     return response;

//   } catch (error: any) {
//     console.error("Error fetching API:", error.message);
//     return {
//       code: "500",
//       message: error.message || "Failed to fetch API",
//       data: null as T,
//     };
//   }
// }

// export default fetchAPIAsync;

