import { headers } from "next/headers";

// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import { useSendLogoutMutation } from "../features/auth/authApiSlice";

// import useAuth from "../hooks/useAuth";
import { HiMiniUser, HiMiniUserPlus } from "react-icons/hi2";
import { MdNote, MdNoteAdd } from "react-icons/md";
import { getToken } from "@/lib/session";
import LogoutButton from "./LogoutButton";
// import { useRouter } from "next/navigation";

// const DASH_REGEX = /^\/dash(\/)?$/;
const TICKETS_REGEX = /^\/dash\/tickets(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = async () => {
  const { isManager, isAdmin } = await getToken();

  const headersList = await headers();

  const pathname = headersList.get("x-pathname") || "/dash";

  // const router = useRouter();
  // const navigate = useNavigate();
  // const { pathname } = useLocation();

  // const [sendLogout, { isLoading, isSuccess, isError, error }] =
  //   useSendLogoutMutation();

  // useEffect(() => {
  //   if (isSuccess) navigate("/");
  // }, [isSuccess, navigate]);

  // const onNewNoteClicked = () => router.push("/dash/tickets/new");
  // const onNewUserClicked = () => router.push("/dash/users/new");
  // const onTicketsClicked = () => router.push("/dash/tickets");
  // const onUsersClicked = () => router.push("/dash/users");

  // let dashClass = null;
  // if (
  //   !DASH_REGEX.test(pathname) &&
  //   !TICKETS_REGEX.test(pathname) &&
  //   !USERS_REGEX.test(pathname)
  // ) {
  //   dashClass = "dash-header__container--small";
  // }

  const isLoading = false; // isLoading;
  // const isError = false; // isError;
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

  // const errClass = isError ? "errmsg" : "offscreen";

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
      {/* {isError && (
        <p className={errClass}>
          Error:{" "}
          {"data" in error ? `Error: ${error.data}` : "An error occurred"}
        </p>
      )} */}
      {/* <p className={errClass}>{error?.data?.message}</p> */}

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
