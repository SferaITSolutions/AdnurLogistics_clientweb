import axios from "axios";
import { ApplyRequest } from "@/shared/types/lenging-page-types";

export const sendApplyRequest = async (data: ApplyRequest) => {
  try {
    const res = await axios.post("/api/v1/contact/send", data);
    return res.data;
  } catch (error) {
    console.error("Request yuborishada xatolik yuz berdi", error);
    throw error;
  }
};
