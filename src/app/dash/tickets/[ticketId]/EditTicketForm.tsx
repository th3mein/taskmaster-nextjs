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
import { TTicket, TUser } from "@/lib/definitions";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTicketById, updateTicket } from "@/actions/ticketActions";
import { Switch } from "@/components/ui/switch";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";

const schema = z.object({
  title: z.string().min(9),
  text: z.string().min(10),
  user: z.string(),
  completed: z.boolean(),
});
export type FormFields = z.infer<typeof schema>;

const EditTicketForm = ({
  ticket,
  users,
  deleteButton,
}: {
  ticket: TTicket;
  users: TUser[];
  deleteButton: boolean;
}) => {
  const router = useRouter();
  const {
    control,
    reset,
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: ticket.title,
      text: ticket.title,
      completed: ticket.completed,
      user: ticket.user,
    },
  });
  const completed = watch("completed");

  const onSubmit: SubmitHandler<FormFields> = async (newTicket) => {
    // reset delete errors if any
    setIsDelError(false);
    setErrContent("");

    const updateTicketResponse = await updateTicket({
      id: ticket.id,
      title: newTicket.title,
      text: newTicket.text,
      user: newTicket.user,
      completed: newTicket.completed,
    });

    if (updateTicketResponse.status === 200) {
      router.push("/dash/tickets");
    } else {
      setError("root", { message: updateTicketResponse.message });
    }
  };

  const created = new Date(ticket.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(ticket.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const usrs = users.map((user) => {
    return (
      <SelectItem key={user.id} value={user.id}>
        {user.username}
      </SelectItem>
    );
  });

  const deleteTicket = async () => {
    console.log("DELETING.....");
    reset();
    setIsDeleting(true);
    const delResponse = await deleteTicketById(ticket.id);

    if (delResponse.status === 200) {
      router.push("/dash/tickets");
    } else {
      setIsDelError(true);
      setErrContent(delResponse.message);
    }

    setIsDeleting(false);
  };

  // Delete
  const [errContent, setErrContent] = useState("");
  const [isDelError, setIsDelError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  let delButton = null;

  if (deleteButton) {
    delButton = (
      <Button
        title="Delete"
        onClick={deleteTicket}
        type="button"
        className="bg-red-700"
      >
        {isDeleting ? (
          <div className="mt-1">
            <Spinner text="Deleting Ticket" />
          </div>
        ) : (
          <>
            <MdOutlineDeleteForever className="text-4xl" />
            Delete
          </>
        )}
      </Button>
    );
  }

  return (
    <Card className="md:mx-auto md:w-3xl mt-20 mx-4">
      <CardHeader>
        <CardTitle>Create a New Ticket</CardTitle>
        <CardDescription>
          <p className="form__created">
            Created:
            {created}
          </p>
          <p className="form__updated">
            Last Updated:
            {updated}
          </p>
          {errors.root && (
            <p
              className={`mt-4 text-red-600 flex align-middle`}
              aria-live="assertive"
            >
              <ShieldAlert className="mr-2" width={18} height={18} />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={ticket.user}
                  >
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

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status" className="mr-2">
                Status: {completed ? "complete" : "open"}
              </Label>
              <Controller
                name="completed"
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
            {delButton}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTicketForm;
