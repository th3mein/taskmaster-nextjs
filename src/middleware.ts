import { NextRequest, NextResponse } from "next/server";
// import { getRefreshToken, setSession } from "./api/authApi";
// import { API_ENDPOINT } from "./lib/constants";
import axios from "axios";
import { getRefreshToken } from "./lib/session";

const API_ENDPOINT = process.env.API_ENDPOINT;

export default async function middleware(req: NextRequest) {
  // This here is incredibly stupid
  // but after spending weeks trying to work refresh token only after accessToken failed,
  // we get a new accessToken from the refresh token before every request
  // which is again incredibly stupid

  // await setSession("adfjadlfjdaslkjasdlfjldsajfaldfj");

  // const requestHeaders1 = new Headers(req.headers);
  // requestHeaders1.set("x-pathname", req.nextUrl.pathname);

  // const response1 = NextResponse.next({
  //   request: {
  //     headers: requestHeaders1,
  //   },
  // });
  // response1.cookies.set({
  //   name: "session",
  //   value: "rrr;sjfl",
  //   httpOnly: true,
  //   expires: 10,
  // });

  // return response1;

  try {
    const jwt = await getRefreshToken();
    const refreshToken = await axios.get(`${API_ENDPOINT}/auth/refresh`, {
      withCredentials: true,
      headers: {
        Cookie: `jwt=${jwt};`,
      },
    });

    const { accessToken: newToken } = refreshToken.data;
    // await setSession(newToken);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", req.nextUrl.pathname);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set({
      name: "session",
      value: newToken,
      httpOnly: true,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.log(error);
    // if (axios.isAxiosError(error) && (error.status === 403 || 401)) {
    return NextResponse.redirect(new URL("/login", req.url));
    // }
  }
}

// export async function middleware() {
//   console.log("Herer Setting sessions..........");
//   // setSession("adfjadlfjdaslkjasdlfjldsajfaldfj");

//   const response = NextResponse.next();

//   response.cookies.set("session", "zzz");

//   return response;

//   // const response = NextResponse.next();
//   // response.cookies.set("session", data.accessToken, { httpOnly: true });
//   // return response;
// }

export const config = {
  // matcher: "/dash/users",
  matcher: ["/dash/:path*"],
  // matcher: ["/dash/users/:path*", "/dash/tasks/:path*"],
};

// // import { NextRequest, NextResponse } from "next/server";
// // import { API_ENDPOINT } from "./lib/constants";

// import { NextResponse } from "next/server";
// import { setSession } from "./api/authApi";

// // export default async function middleware(req: NextRequest) {
// //   const accessToken = req.cookies.get("session")?.value;

// //   // Clone the request and set the Authorization header if the access token exists
// //   const requestHeaders = new Headers(req.headers);
// //   if (accessToken) {
// //     requestHeaders.set("Authorization", `Bearer ${accessToken}`);
// //   }

// //   // Create the modified request with the updated headers
// //   const originalRequest = new Request(req.url, {
// //     method: req.method,
// //     headers: requestHeaders,
// //     body: req.body,
// //     redirect: "manual", // Prevent auto-redirects
// //   });

// //   let response = await fetch(originalRequest);

// //   // Handle 401 Unauthorized by refreshing the token
// //   if (response.status === 403) {
// //     const refreshResponse = await fetch(`${API_ENDPOINT}/auth/refresh`, {
// //       method: "GET",
// //       credentials: "include",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Cookie: req.cookies.toString(),
// //       },
// //     });

// //     if (refreshResponse.ok) {
// //       const { accessToken: newAccessToken } = await refreshResponse.json();

// //       console.log("2323", accessToken);
// //       // Update the original request with the new access token
// //       requestHeaders.set("Authorization", `Bearer ${newAccessToken}`);
// //       const retryRequest = new Request(req.url, {
// //         method: req.method,
// //         headers: requestHeaders,
// //         body: req.body,
// //         redirect: "manual",
// //       });

// //       // Retry the original request with the new token
// //       response = await fetch(retryRequest);

// //       // Set the new access token in the cookies
// //       const cookieResponse = NextResponse.next();
// //       cookieResponse.headers.set(
// //         "Set-Cookie",
// //         `session=${newAccessToken}; Path=/; HttpOnly`
// //       );
// //       return cookieResponse;
// //     } else {
// //       // Redirect to login if token refresh fails
// //       const redirectResponse = NextResponse.redirect("/login");
// //       redirectResponse.cookies.delete("session");
// //       return redirectResponse;
// //       // console.log("ERRRRROR");
// //     }
// //   }

// //   return response;
// // }

// // export const config = {
// //   matcher: [
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     "/(api|trpc)(.*)",
// //   ],
// // };

// // import axios from "axios";
// // import { Azeret_Mono } from "next/font/google";
// // import { NextRequest, NextResponse } from "next/server";
// // import { ax } from "./lib/axiosInstance";
// // import { cookies } from "next/headers";
// // import { setSession } from "./api/authApi";
// // // import { updateSession } from "./lib";

// // // export async function middleware(request: NextRequest) {
// // //   console.log(request.nextUrl.pathname);
// // //   // return await updateSession(request);
// // // }

// // export async function middleware(req: NextRequest) {
// //   try {
// //     const refreshToken = (await cookies()).get("jwt")?.value || "";

// //     const res = (await ax.get("/auth/refresh", {
// //       withCredentials: true,
// //       headers: {
// //         Cookie: `jwt=${refreshToken};`,
// //       },
// //     })) as NextResponse;

// //     const data = await res.json();

// //     // req.cookies.set("session", data.accessToken, { httpOnly: true });
// //     const response = NextResponse.next();
// //     response.cookies.set("session", data.accessToken, { httpOnly: true });
// //     return response;

// //     // await setSession(data.accessToken);
// //   } catch (error) {
// //     console.log(error);
// //   }

// //   // const response = NextResponse.next();
// //   // console.log(response.body);
// //   // response.cookies.set("myCookieName", "some-value", { httpOnly: true });
// //   // return response;
// //   // console.log("000000000000000000000000000000000000000");
// //   // console.log(req.cookies.get("jwt"));
// //   // console.log(req.nextUrl.pathname);
// //   // let response = await fetch(req);
// //   // console.log(response, "::::::::::::::::::::::::;;");
// //   // return response;
// // }

// // // export const config = {
// // //   matcher: [
// // //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// // //     "/(auth|trpc)(.*)",
// // //   ],
// // // };

// export const config = { matcher: "/api/auth/refresh" };
