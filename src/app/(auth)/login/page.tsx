"use client";

/* Hook imports */
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* UI imports */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert } from "lucide-react";

/* Component imports */
import Spinner from "@/components/Spinner";

import { useRouter } from "next/navigation";
import axios from "axios";
import { setSession } from "@/lib/session";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
export type FormFields = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (creds) => {
    try {
      const { data } = await axios.post("api/auth/login", creds);
      setSession(data.accessToken);
      router.replace("/dash");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", { message: error.response?.data.message });
      } else {
        setError("root", { message: "Something went horribly wrong." });
      }
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email username and password to login to your account
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
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">User name</Label>
                  <Input
                    {...register("username")}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    autoComplete="off"
                    className={` ${errors.username ? "input-error" : ""}`}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    className={` ${errors.username ? "input-error" : ""}`}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    {isSubmitting ? (
                      <div className="mt-1">
                        <Spinner text="Logging In" />
                      </div>
                    ) : (
                      <>Login</>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
