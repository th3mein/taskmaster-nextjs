import { getUsers } from "@/actions/userActions";
import Users from "./Users";

export default async function UsersList() {
  const users = await getUsers();

  return <Users users={users} />;
}
