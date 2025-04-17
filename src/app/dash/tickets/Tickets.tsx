import Ticket from "./Ticket";
import { TTicket } from "@/lib/definitions";

type TicketsProps = {
  tickets: TTicket[];
};
export default async function Tickets({ tickets }: TicketsProps) {
  const tableContent = tickets.map((ticket) => (
    <Ticket key={ticket.id} ticket={ticket} />
  ));

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
                  Title
                </th>
                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] hidden lg:table-cell"
                >
                  Text
                </th>
                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                >
                  Assignee
                </th>
                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                >
                  Created
                </th>
                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                >
                  Updated
                </th>
                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {tickets ? tableContent : <p>No tickets found</p>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
