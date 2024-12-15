import apiClient from "@/api/client";

const ENDPOINT = "/prospect-email";

export async function denyEmail(resourceId: string): Promise<void> {
  try {
    const response = await apiClient.put(`${ENDPOINT}/${resourceId}/deny`, {});
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
