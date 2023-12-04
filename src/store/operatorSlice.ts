import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITicket } from "./userSlice"
import { isParsable } from "../_helper/helper-functions"

export interface IOperatorTicket extends ITicket {
    generated: boolean
}

export interface IOperatorState {
    money: number
    tickets: IOperatorTicket[]
}

const initialState: IOperatorState = {
    money: parseInt(localStorage.getItem("operator_money") || "0"),
    tickets: isParsable(localStorage.getItem("operator_tickets")) || []
}

const operatorSlice = createSlice({
    name: "opearator",
    initialState,
    reducers: {
        setMoney: (state: IOperatorState, action: PayloadAction<number>) => {
            localStorage.setItem("operator_money", action.payload.toString());
            return { ...state, money: action.payload }
        },
        setTickets: (state: IOperatorState, action: PayloadAction<IOperatorTicket[]>) => {
            localStorage.setItem("operator_tickets", JSON.stringify(action.payload));
            return { ...state, tickets: action.payload }
        },
        reset: () => {
            localStorage.clear();
            return { money: 0, tickets: [] }
        },
    },
})

export const { setMoney, setTickets, reset } = operatorSlice.actions
export default operatorSlice.reducer