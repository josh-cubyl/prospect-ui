import apiClient from "@/api/client";
import { GetEmailResponse } from "./types/get-email-response.types";

const ENDPOINT = "/prospect-email";

export async function getEmails(): Promise<GetEmailResponse["data"]> {
  try {
    const response = await apiClient.get(`${ENDPOINT}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
