import { NextRequest } from "next/server";
import { ax } from "@/lib/axiosInstance";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await ax.post("auth", body);
    return res;
  } catch (error) {
    // return error;
    console.log(error);
  }
}
