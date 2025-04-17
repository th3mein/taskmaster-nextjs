import { getTickets } from "@/actions/ticketActions";
import Tickets from "./Tickets";

export default async function UsersList() {
  const tickets = await getTickets();
  tickets.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );
  return <Tickets tickets={tickets} />;
}
