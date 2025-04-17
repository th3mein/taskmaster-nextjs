"use server";

import axios from "axios";
import { NextResponse } from "next/server";
import { getSession } from "./session";

const API_ENDPOINT = process.env.API_ENDPOINT;

export const ax = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

ax.interceptors.response.use(
  function (response) {
    console.log(":::::::::::::", API_ENDPOINT);

    // Convert Axios response to NextResponse
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    return nextResponse;
  },
  function (error) {
    // Handle errors
    const nextResponse = NextResponse.json(
      error.response?.data || error.message,
      {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || "Internal Server Error",
      }
    );
    return nextResponse;
  }
);

export const ApiClient = async () => {
  const defaultOptions = {
    baseURL: API_ENDPOINT,
  };
  const instance = axios.create(defaultOptions);
  instance.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session) {
      config.headers.Authorization = `Bearer ${session}`;
    }

    return config;
  });

  return instance;
};
