"use server";

import { TUser } from "@/lib/definitions";
import { ApiClient } from "../lib/axiosInstance";
import axios from "axios";

export async function getUsers(): Promise<TUser[] | []> {
  const api = await ApiClient();

  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUserById(id: string) {
  const users = await getUsers();
  const user = users.find((user) => user.id === id);
  return user;
}

export async function addUser(user: Partial<TUser>) {
  const api = await ApiClient();

  try {
    const res = await api.post("/users", user);
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error && axios.isAxiosError(error)) {
      return error?.response?.data;
    } else {
      return { message: "Something went terribly wrong while updating user." };
    }
  }
}

export async function updateUser(user: Partial<TUser>) {
  const api = await ApiClient();

  try {
    const res = await api.patch("/users", user);
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error && axios.isAxiosError(error)) {
      return error?.response?.data;
    } else {
      return { message: "Something went terribly wrong while updating user." };
    }
  }
}

export async function deleteUser(userId: string) {
  const api = await ApiClient();

  try {
    const res = await api.delete("/users", { data: { id: userId } });
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error && axios.isAxiosError(error)) {
      return error?.response?.data;
    } else {
      return { message: "Something went terribly wrong while deleting user." };
    }
  }
}
