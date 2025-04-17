export type TUser = {
  id: string;
  username: string;
  password?: string;
  roles: string[];
  active: boolean;
};

export type TTicket = {
  completed: boolean;
  createdAt: string;
  id: string;
  text: string;
  ticket: number;
  title: string;
  updatedAt: string;
  user: string;
  username: string;
};

export enum ROLES {
  Employee = "employee",
  Manager = "manager",
  Admin = "admin",
}
