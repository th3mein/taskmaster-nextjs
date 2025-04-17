"use client";

import { deleteUser, updateUser } from "@/actions/userActions";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ROLES, TUser } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteIcon, SaveIcon, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3).optional().or(z.literal("")),
  roles: z.array(z.string()).optional(),
  status: z.boolean(),
});
export type FormFields = z.infer<typeof schema>;

const EditUserForm = ({ user }: { user: TUser }) => {
  const router = useRouter();
  const {
    reset,
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user.username,
      roles: user.roles,
      status: user.active,
    },
  });
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });
  const active = watch("status");

  const [errContent, setErrContent] = useState("");
  const [isDelError, setIsDelError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async (userData) => {
    let resUpdate;

    // reset delete errors if any
    setIsDelError(false);
    setErrContent("");

    if (userData.password) {
      resUpdate = await updateUser({
        id: user.id,
        username: userData.username,
        password: userData.password,
        roles: userData.roles,
        active: userData.status,
      });
    } else {
      resUpdate = await updateUser({
        id: user.id,
        username: userData.username,
        roles: userData.roles,
        active: userData.status,
      });
    }
    if (resUpdate.status === 200) {
      router.push("/dash/users");
    } else {
      setError("root", { message: resUpdate.message });
    }
  };

  const onDeleteUserClicked = async () => {
    reset();
    setIsDeleting(true);
    const delResponse = await deleteUser(user.id);

    if (delResponse.status === 200) {
      router.push("/dash/users");
    } else {
      setIsDelError(true);
      setErrContent(delResponse.message);
    }

    setIsDeleting(false);

    // delete user..
  };

  return (
    <Card className="md:mx-auto md:w-3xl mt-20 mx-4">
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
        <CardDescription>
          {errors.root && (
            <p className={`mt-4 text-red-600 flex`} aria-live="assertive">
              <ShieldAlert className="mr-1" width={18} height={18} />
              {errors.root.message}
            </p>
          )}

          {isDelError && (
            <p className={`mt-4 text-red-600 flex`} aria-live="assertive">
              <ShieldAlert className="mr-1" width={18} height={18} />
              {errContent}
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">
                Username <span className="">[3-20 letters]</span>
              </Label>
              <Input
                {...register("username")}
                id="username"
                name="username"
                autoComplete="off"
                className={` ${errors.username ? "input-error" : ""}`}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">
                Password{" "}
                <span className="text-nowrap">[empty = no change]</span>
                <span className="text-nowrap">
                  [4-12 characters incl. !@#$%]
                </span>
              </Label>
              <Input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                className={` ${errors.password ? "input-error" : ""}`}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="roles">Assigned Roles</Label>
              <select
                {...register("roles")}
                id="roles"
                name="roles"
                className={`w-[100%] ${
                  errors.roles ? "input-error" : ""
                } border-1 overflow-hidden leading-3 rounded-md`}
                multiple={true}
                size={3}
              >
                {options}
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status" className="mr-2">
                Status: {active ? "active" : "inactive"}
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Switch
                    className="border-1 border-foreground"
                    id="status"
                    checked={field.value ?? false} // Ensure it's not undefined on first render
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <CardFooter className="flex gap-2 px-0">
              <Button variant="outline" type="submit">
                {isSubmitting ? (
                  <div className="mt-1">
                    <Spinner text="Saving updates" />
                  </div>
                ) : (
                  <>
                    <SaveIcon />
                    Save
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={onDeleteUserClicked}
                className="bg-red-700"
                type="button"
              >
                {isDeleting ? (
                  <div className="mt-1">
                    <Spinner text="Deleting User" />
                  </div>
                ) : (
                  <>
                    <DeleteIcon />
                    Delete User
                  </>
                )}
              </Button>
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default EditUserForm;
