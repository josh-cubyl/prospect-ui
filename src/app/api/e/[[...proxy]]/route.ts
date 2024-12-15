import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { method, url } = req;
  const urlObj = new URL(url || "");
  const searchParams = new URLSearchParams(urlObj.searchParams);
  const slug = urlObj.pathname.split("/").slice(3);

  const path = (slug as string[]).join("/");
  const query = searchParams.toString();

  // Append the path to the target API's URL
  const apiUrl = `${process.env.API_URL}/${path}${query ? `?${query}` : ""}`;
  try {
    const headers = req.headers as any;

    const request: AxiosRequestConfig<any> = {
      url: apiUrl,
      method,
      headers: {
        // Forward the headers if needed
        ...((headers as any) || {}),
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };

    // Turn the body into JSON if needed
    if (method == "POST" || method == "PUT") request.data = await req.json();

    const response = await axios(request);

    const responseHeaders = response.headers;
    if (!responseHeaders["content-type"]?.includes("application/json")) {
      return new Response(response.data, {
        status: response.status,
        headers: {
          "Content-Type": responseHeaders["content-type"],
          "Content-Disposition": responseHeaders["content-disposition"],
        },
      });
    }

    // Forward the response if request succeeds
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data,
      },
      {
        status: error.response?.status,
      }
    );
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
