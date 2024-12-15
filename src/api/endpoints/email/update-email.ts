import apiClient from "@/api/client";
import { EmailUpdateInterface } from "./types/update-email-request.types";

const ENDPOINT = "/prospect-email";

export async function updateEmail(
  payload: EmailUpdateInterface
): Promise<void> {
  const { resourceId, ...rest } = payload;
  try {
    const response = await apiClient.put(`${ENDPOINT}/${resourceId}`, rest);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
