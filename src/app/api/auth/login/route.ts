import { NextRequest, NextResponse } from "next/server";
import { ax } from "@/lib/axiosInstance";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  try {
    const res = (await ax.post("auth", body)) as NextResponse;
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }
}
