"use client";

import { addUser } from "@/actions/userActions";
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
import { ROLES } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  roles: z.array(z.string()).optional(),
});
export type FormFields = z.infer<typeof schema>;

const NewUserForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const onSubmit: SubmitHandler<FormFields> = async (userData) => {
    const newUserResponse = await addUser({
      username: userData.username,
      password: userData.password,
      roles: userData.roles,
    });

    if (newUserResponse.status === 201) {
      router.push("/dash/users");
    } else {
      setError("root", { message: newUserResponse.message });
    }
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
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default NewUserForm;
