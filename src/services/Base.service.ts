import axios from "axios";
import type { ResultService } from "../types/Base/ResultService";

async function fetchAPIAsync<T>(
  url: string,
  method: string,
  data?: T,
  isAuthenticated: boolean = false,
): Promise<ResultService<T>> {
  try {
    const response: ResultService<T> = {
        code: "-1",
        message: "",
        data: null as T,
    }

    const headers: Record<string, string> = {};
    if (isAuthenticated) {
      const token = localStorage.getItem('token'); 
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        response.message='Authentication token not found';
        return response;
      }
    }
    const result  = await axios({
      url,
      method,
      data,
      headers,
    });
    if (result.status !== 200) {
      response.code = "-1";
      response.message = result.statusText;
      return response;
    }
    response.code = "0";
    response.data = result.data.data;
    

    return response;

  } catch (error: any) {
    console.error("Error fetching API:", error.message);
    return {
      code: "500",
      message: error.message || "Failed to fetch API",
      data: null as T,
    };
  }
}

export default fetchAPIAsync;