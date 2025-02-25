import { API_URI } from "@/app/global";
import axiosInstance from "./axiosInstance";
import {User} from './model';

const getUser = async ({
  onSuccess,
  onError
}: {
  onSuccess: (user: User) => void;
  onError: (err: any) => void;
}) => {
    try {
      const response = await axiosInstance.get(API_URI + "/user", {
        responseType: "json",
        // headers: {'Cache-Control': 's-maxage=86400'}
      });
      onSuccess(response.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      onError(err);
    }
};

export {getUser}