// import axios from "axios";
// import {
//   createSession,
//   getRefreshToken,
//   getSession,
//   setSession,
// } from "@/api/authApi";
// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { ax } from "@/lib/axiosInstance";

import { NextResponse } from "next/server";

// import { getSession, setSession } from "@/api/authApi";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // console.log(req.cookies.get("session"));
  // const session = await getSession();
  console.log(
    "Internal api POST /api/refresh -------------------------------------"
  );

  // const cookieStore = await cookies();
  // await cookieStore.set("session", "aldkfjadlfjadslkfjal;sdoeiiieoiadadf");

  return NextResponse.json({ message: "success!" });
  // const refreshToken = (await cookies()).get("jwt")?.value || "";
  // const session = await getSession();

  // const { refreshToken } = await req.json();

  // try {
  //   const response = await ax.get(`auth/refresh`, {
  //     withCredentials: true,
  //     headers: {
  //       Cookie: `jwt=${refreshToken};`,
  //     },
  //   });
  //   return response;
  // } catch (error) {
  //   // console.log(error);
  // }

  // const { accessToken } = await (response as unknown as NextResponse).json();
  // console.log(accessToken, "->->->->->->->->->->->");

  // return response;
  // try {
  //   // const jwt = await getRefreshToken();
  //   const { jwt } = await req.json();
  //   // console.log("::::", jwt);
  //   const response = await axios.get(`http://localhost:3500/auth/refresh`, {
  //     withCredentials: true,
  //     headers: {
  //       Cookie: `jwt=${jwt};`,
  //     },
  //   });

  //   // console.log("/?????");
  //   // console.log(response.data.accessToken);
  //   // console.log("/?????");
  //   // createSession(response.data.accessToken);
  //   return NextResponse.json({ data: response.data }, { status: 200 });

  //   return response.data.accessToken;
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     console.log(error.response?.status, error.response?.data);

  //     return NextResponse.json(
  //       { data: error.response?.data },
  //       { status: error.response?.status }
  //     );
  //   } else {
  //     return NextResponse.json(
  //       { data: { message: "Something went terribly wrong." } },
  //       { status: 500 }
  //     );
  //   }
  // }
  // // const jwt = await getRefreshToken();
  // const { jwt } = await req.json();
  // // console.log("::::", jwt);
  // const response = await axios.get(`http://localhost:3500/auth/refresh`, {
  //   withCredentials: true,
  //   headers: {
  //     Cookie: `jwt=${jwt};`,
  //   },
  // });

  // console.log("/?????");
  // console.log(response.data.accessToken);
  // console.log("/?????");
  // createSession(response.data.accessToken);

  // return response.data.accessToken;

  // const { accessToken } = response.data;

  // return accessToken;

  // Store the new access and refresh tokens.
  // setSession(accessToken);
  // const jwt = await getRefreshToken();
  // const ssn = await getSession();

  // const cookieStore = await cookies();
  // const sessionCookie = cookieStore.get("session");

  // console.log(sessionCookie, "::::::::::::::::");
  // console.log(ssn, ":::::::::::::::::::::::");
  // try {
  //   const response = await axios.get(`http://localhost:3500/auth/refresh`, {
  //     withCredentials: true,
  //     headers: {
  //       Cookie: `jwt=${jwt};`,
  //     },
  //   });

  //   const { accessToken } = response.data;
  //   createSession(accessToken);

  //   return NextResponse.json({ data: accessToken }, { status: 200 });
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     return NextResponse.json(
  //       { data: error.response?.data },
  //       { status: error.response?.status }
  //     );
  //   } else {
  //     return NextResponse.json(
  //       { data: { message: "Something went terribly wrong." } },
  //       { status: 500 }
  //     );
  //   }
  // }
}
