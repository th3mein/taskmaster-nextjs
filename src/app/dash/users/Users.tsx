import User from "./User";
import { TUser } from "@/lib/definitions";

type UsersPorps = {
  users: TUser[];
};
export default async function Users({ users }: UsersPorps) {
  const tableContent = users.map((user) => <User key={user.id} user={user} />);

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                >
                  Username
                </th>

                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                >
                  Roles
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">{tableContent}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
