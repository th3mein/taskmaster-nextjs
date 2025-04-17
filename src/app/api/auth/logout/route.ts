import { NextResponse } from "next/server";
import { clearCookies, getRefreshToken } from "@/lib/session";
import axios from "axios";

const API_ENDPOINT = process.env.API_ENDPOINT;

export async function POST() {
  try {
    const jwt = await getRefreshToken();
    const res = await axios.post(
      `${API_ENDPOINT}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: `jwt=${jwt};`,
        },
      }
    );
    const nextResponse = NextResponse.json(res.data, {
      status: res.status,
      statusText: res.statusText,
    });

    await clearCookies();

    return nextResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
}
