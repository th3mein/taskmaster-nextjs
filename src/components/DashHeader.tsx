import { headers } from "next/headers";
import { HiMiniUser, HiMiniUserPlus } from "react-icons/hi2";
import { MdNote, MdNoteAdd } from "react-icons/md";
import { getToken } from "@/lib/session";
import LogoutButton from "./LogoutButton";
const TICKETS_REGEX = /^\/dash\/tickets(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = async () => {
  const { isManager, isAdmin } = await getToken();

  const headersList = await headers();

  const pathname = headersList.get("x-pathname") || "/dash";

  const isLoading = false; // isLoading;
  let newTicketButton = null;
  if (TICKETS_REGEX.test(pathname)) {
    newTicketButton = (
      <a
        className="mr-4 flex cursor-pointer"
        title="New Ticket"
        href="/dash/tickets/new"
      >
        <MdNoteAdd className="text-2xl mr-1" />
        New Ticket
      </a>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <a
        className="flex mr-4 cursor-pointer"
        title="New User"
        href="/dash/users/new"
      >
        <HiMiniUserPlus className="text-2xl mr-1" />
        Add User
      </a>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <a
          className="flex mr-4 cursor-pointer"
          title="Users"
          href="/dash/users"
        >
          <HiMiniUser className="text-2xl" /> Users
        </a>
      );
    }
  }

  let ticketsButton = null;
  if (!TICKETS_REGEX.test(pathname) && pathname.includes("/dash")) {
    ticketsButton = (
      <a
        className="flex mr-4 cursor-pointer"
        title="Tickets"
        href="/dash/tickets"
      >
        <MdNote className="mr-1 text-2xl" /> Tickets
      </a>
    );
  }

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newTicketButton}
        {ticketsButton}
        {newUserButton}
        {userButton}
        <LogoutButton />
      </>
    );
  }

  const content = (
    <>
      <header>
        <nav className="text-right p-4 flex flex-row justify-end cursor-pointer mr-4">
          {buttonContent}
        </nav>
      </header>
    </>
  );

  return content;
};
export default DashHeader;
