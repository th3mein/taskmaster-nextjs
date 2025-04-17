import { getUserById } from "@/actions/userActions";
import EditUserForm from "./EditUserForm";

const EditUser = async ({
  params,
}: {
  params: Promise<{ userid: string }>;
}) => {
  const { userid } = await params;
  const user = await getUserById(userid);

  return user ? <EditUserForm user={user} /> : <p>User not found</p>;
};
export default EditUser;
