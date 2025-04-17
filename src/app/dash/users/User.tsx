import type { TUser } from "@/lib/definitions";
import Button from "@/components/Button";

const User = ({ user }: { user: TUser }) => {
  const userRolesString = user.roles.toString().replaceAll(",", ", ");

  const cellStatus = user.active ? "" : "opacity-30";

  return (
    <tr
      className={`hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ${cellStatus}`}
    >
      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        {user.username}
      </td>
      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
        {userRolesString}
      </td>

      <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ">
        <Button type="edit" link={`/dash/users/${user.id}`} />
      </td>
    </tr>
  );
};

export default User;
