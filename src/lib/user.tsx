import { API_URI } from "@/app/global";
import axiosInstance from "./axiosInstance";
import {User} from './model';

const getUser = async (): Promise<User | undefined> => {
    try {
      const response = await axiosInstance.get(API_URI + "/user", {
        responseType: "json",
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching user:", err);
      return undefined;  // or handle the error as needed
    }
};

export {getUser}