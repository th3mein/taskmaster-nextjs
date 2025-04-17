import { getToken } from "@/lib/session";

const Welcome = async () => {
  const { username } = await getToken();

  return <h1 className="text-2xl">Welcome {username}!</h1>;
};
export default Welcome;
