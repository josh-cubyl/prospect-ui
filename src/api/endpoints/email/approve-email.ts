import apiClient from "@/api/client";

const ENDPOINT = "/prospect-email";

export async function approveEmail(resourceId: string): Promise<void> {
  try {
    const response = await apiClient.put(
      `${ENDPOINT}/${resourceId}/approve`,
      {}
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
