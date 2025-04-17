import { MdNote, MdNoteAdd } from "react-icons/md";
import { HiMiniUser, HiUserPlus } from "react-icons/hi2";
import { getToken } from "@/lib/session";

const DashButtons = async () => {
  const { isManager, isAdmin } = await getToken();

  return (
    <div className="flex mt-4">
      <p>
        <a
          href="/dash/tickets"
          className="flex p-4 rounded-full bg-foreground text-background items-center mr-2 "
        >
          <MdNote className="mr-2  text-2xl" /> Tickets
        </a>
      </p>

      <p>
        <a
          href="/dash/tickets/new"
          className="flex p-4 rounded-full bg-foreground text-background items-center mr-2 "
        >
          <MdNoteAdd className="mr-2  text-2xl" /> Add New Ticket
        </a>
      </p>

      {(isManager || isAdmin) && (
        <p>
          <a
            href="/dash/users"
            className="flex p-4 rounded-full bg-primary text-black items-center mr-2 "
          >
            <HiMiniUser className="mr-2 text-2xl" />
            Users
          </a>
        </p>
      )}

      {(isManager || isAdmin) && (
        <p>
          <a
            href="/dash/users/new"
            className="flex p-4 rounded-full bg-primary text-black items-center "
          >
            <HiUserPlus className="text-2xl" />
            Add New User
          </a>
        </p>
      )}
    </div>
  );
};
export default DashButtons;
