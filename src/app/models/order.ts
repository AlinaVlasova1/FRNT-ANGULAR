import {ITour} from "./tours";

export interface IOrder {
  age: string | null,
  birthDay: string | null,
  cardNumber: string | null,
  tourId: string | null,
  userId: string | null,
}

export type IOrdersAndTours = IOrder[] & ITour[];
