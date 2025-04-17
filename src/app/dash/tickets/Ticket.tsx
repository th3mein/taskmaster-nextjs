// import { useNavigate } from "react-router-dom";
// import { memo } from "react";
// import { useSelector } from "react-redux";
// import { selectTicketById } from "./ticketsApiSlice";
// import { RootState } from "../../app/store";
// import { useGetTicketsQuery } from "./ticketsApiSlice";
// import { FaRegEdit } from "react-icons/fa";
import type { TTicket } from "@/lib/definitions";
import Button from "@/components/Button";

const Ticket = ({ ticket }: { ticket: TTicket }) => {
  const created = new Date(ticket.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });

  const updated = new Date(ticket.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });

  const cellStatus = ticket.completed ? "opacity-30" : "";

  return (
    <tr
      className={`hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors  ${cellStatus}`}
    >
      <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        {ticket.title}
      </td>
      <td className="p-2 align-middle  [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] hidden lg:table-cell">
        {ticket.text}
      </td>
      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        {ticket.username}
      </td>

      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        {updated}
      </td>
      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        {created}
      </td>

      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        {ticket.completed ? (
          <span className="ticket__status--completed">Completed</span>
        ) : (
          <span className="ticket__status--open">Open</span>
        )}
      </td>

      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        <Button type="edit" link={`/dash/tickets/${ticket.id}`} />
      </td>
    </tr>
  );
};

export default Ticket;
