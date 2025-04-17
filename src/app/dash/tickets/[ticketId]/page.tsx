import { getTicketById } from "@/actions/ticketActions";
import EditTicketForm from "./EditTicketForm";
import { getUsers } from "@/actions/userActions";
import { getToken } from "@/lib/session";

const EditTicket = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const { ticketId } = await params;
  const ticket = await getTicketById(ticketId);
  const users = await getUsers();
  const { isManager, isAdmin } = await getToken();
  console.log(isManager, isAdmin);
  const showDelButton = isManager || isAdmin;
  return ticket ? (
    <EditTicketForm
      ticket={ticket}
      users={users}
      deleteButton={showDelButton}
    />
  ) : (
    <p>Ticket not found</p>
  );
};
export default EditTicket;
