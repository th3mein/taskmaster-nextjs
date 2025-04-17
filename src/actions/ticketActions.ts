"use server";

import { TTicket } from "@/lib/definitions";
import { ApiClient } from "../lib/axiosInstance";
import axios from "axios";

export async function getTickets(): Promise<TTicket[] | []> {
  const api = await ApiClient();

  try {
    const res = await api.get("/notes");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTicketById(id: string) {
  const tickets = await getTickets();
  const ticket = tickets.find((ticket) => ticket.id === id);
  return ticket;
}

export async function addTicket(user: Partial<TTicket>) {
  const api = await ApiClient();

  try {
    const res = await api.post("/notes", user);
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error && axios.isAxiosError(error)) {
      return error?.response?.data;
    } else {
      return { message: "Something went terribly wrong while updating user." };
    }
  }
}

export async function updateTicket(ticket: Partial<TTicket>) {
  const api = await ApiClient();

  try {
    const res = await api.patch("/notes", ticket);
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error && axios.isAxiosError(error)) {
      return error?.response?.data;
    } else {
      return { message: "Something went terribly wrong while updating user." };
    }
  }
}

export async function deleteTicketById(ticketId: string) {
  const api = await ApiClient();

  try {
    const res = await api.delete("/notes", { data: { id: ticketId } });
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error && axios.isAxiosError(error)) {
      return error?.response?.data;
    } else {
      return { message: "Something went terribly wrong while deleting user." };
    }
  }
}
