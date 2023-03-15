import { NextApiRequest } from "next";

export interface user {
  name: string;
  email: string;
  _id: string;
}

export interface item {
  name: string;
  image?: string;
  category: string;
  note?: string;
  _id?: string;
}

export interface shoppingListItem {
  _id?: string;
  item: item;
  quantity: number;
  bought: boolean;
}

export interface shoppingList {
  name: string;
  _id?: string;
  items: shoppingListItem[];
  status: shoppingListStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface category {
  name: string;
  _id: string;
}

export enum shoppingListStatus {
  active = "active",
  completed = "completed",
  cancelled = "cancelled",
}

export interface loginData {
  email: string;
  password: string | number;
  customError?: string;
}

export interface signUpData {
  name: string;
  email: string;
  password: string | number;
  customError?: string;
}

export interface NextApiReq extends NextApiRequest {
  user: user;
  login: (user: user, callback: (err: Error) => any) => void;
  logout: (callBack: (err: Error) => void) => void;
  [x: string]: any;
}
