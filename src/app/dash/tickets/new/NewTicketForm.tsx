"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveIcon, ShieldAlert } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";
import { TUser } from "@/lib/definitions";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTicket } from "@/actions/ticketActions";

const schema = z.object({
  title: z.string().min(9),
  text: z.string().min(10),
  user: z.string(),
});
export type FormFields = z.infer<typeof schema>;

const NewTicketForm = ({ users }: { users: TUser[] }) => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (newTicket) => {
    console.log(newTicket);

    const newTicketResponse = await addTicket({
      user: newTicket.user,
      title: newTicket.title,
      text: newTicket.text,
    });

    console.log(newTicketResponse);
    if (newTicketResponse.status === 201) {
      router.push("/dash/tickets");
    } else {
      setError("root", { message: newTicketResponse.message });
    }
  };

  const usrs = users.map((user) => {
    return (
      <SelectItem key={user.id} value={user.id}>
        {user.username}
      </SelectItem>
    );
  });
  return (
    <Card className="md:mx-auto md:w-3xl mt-20 mx-4">
      <CardHeader>
        <CardTitle>Create a New Ticket</CardTitle>
        <CardDescription>
          {errors.root && (
            <p
              className={`mt-4 text-red-600 flex align-middle`}
              aria-live="assertive"
            >
              <ShieldAlert className="mr-2" width={18} height={18} />
              {errors.root.message}
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                {...register("title")}
                id="title"
                name="title"
                autoComplete="off"
                className={` ${errors.title ? "input-error" : ""}`}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="note-text">Text *</Label>
              <Textarea
                {...register("text")}
                id="text"
                name="text"
                autoComplete="off"
                className={` ${errors.text ? "input-error" : ""}`}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="users">Assignee:</Label>
              <Controller
                name="user"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger
                      id="users"
                      className={`w-80  ${errors.user ? " input-error" : ""}`}
                    >
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="bg-white text-black"
                    >
                      {usrs}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <CardFooter className="flex gap-2 px-0 mt-8">
            <Button variant="outline" type="submit">
              {isSubmitting ? (
                <div className="mt-1">
                  <Spinner text="Saving new Ticket" />
                </div>
              ) : (
                <>
                  <SaveIcon />
                  Save
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewTicketForm;
