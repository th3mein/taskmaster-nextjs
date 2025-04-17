import { getUsers } from "@/actions/userActions";
import NewTicketForm from "./NewTicketForm";

const NewUser = async () => {
  const users = await getUsers();

  return <NewTicketForm users={users} />;
};
export default NewUser;
