"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function setSession(session: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    secure: true,
    httpOnly: true,
    maxAge: 10,
  });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  return session;
}

export async function getRefreshToken() {
  const jwt = (await cookies()).get("jwt")?.value;
  return jwt;
}

export type JwtToken = {
  UserInfo: {
    username: string;
    roles: string[];
  };
};

export async function getToken() {
  const token = await getSession();
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded: JwtToken = jwtDecode<JwtToken>(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("manager");
    isAdmin = roles.includes("admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
}

export async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}
