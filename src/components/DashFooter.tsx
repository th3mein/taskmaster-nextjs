import { getToken } from "@/lib/session";
import { headers } from "next/headers";
import { RiHome9Fill } from "react-icons/ri";

const DashFooter = async ({ className }: { className: string }) => {
  const { username, status } = await getToken();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <p className="m-1">
        <a
          className="bg-foreground text-background p-2 cursor-pointer rounded-xs w-8 h-8 block"
          title="Home"
          href="/dash"
        >
          <RiHome9Fill width={24} height={24} />
        </a>
      </p>
    );
  }

  const content = (
    <footer className={`${className} flex border-1 rounded-xs`}>
      {goHomeButton}
      <p className="p-2 border-r-foreground"> User: {username}</p>
      <p className="p-2 border-r-foreground"> Status: {status}</p>
      <p className="p-2 flex-1 text-right bg-background text-foreground">
        {today}
      </p>
    </footer>
  );
  return content;
};
export default DashFooter;
