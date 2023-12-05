import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITicket } from "./userSlice"
import { isParsable } from "../_helper/helper-functions"

const lastDrawDate = localStorage.getItem("last_draw_date");

export interface IOperatorTicket extends ITicket {
    generated: boolean
}

export interface IOperatorState {
    money: number
    tickets: IOperatorTicket[]
    drawn: boolean
    lastDrawDate: Date | null
}

const initialState: IOperatorState = {
    money: parseInt(localStorage.getItem("operator_money") || "0"),
    tickets: isParsable(localStorage.getItem("operator_tickets")) || [],
    drawn: localStorage.getItem("operator_drawn") === "true" || false,
    lastDrawDate: lastDrawDate ? new Date(lastDrawDate) : null
}

const operatorSlice = createSlice({
    name: "opearator",
    initialState,
    reducers: {
        setOperatorMoney: (state: IOperatorState, action: PayloadAction<number>) => {
            localStorage.setItem("operator_money", action.payload.toString());
            return { ...state, money: action.payload }
        },
        setOperatorTickets: (state: IOperatorState, action: PayloadAction<IOperatorTicket[]>) => {
            localStorage.setItem("operator_tickets", JSON.stringify(action.payload));
            return { ...state, tickets: action.payload }
        },
        setOperatorDrawn: (state: IOperatorState, action: PayloadAction<boolean>) => {
            localStorage.setItem("operator_drawn", action.payload.toString());
            return { ...state, drawn: action.payload }
        },
        setLastDrawDate: (state: IOperatorState, action: PayloadAction<Date>) => {
            localStorage.setItem("last_draw_date", action.payload?.toLocaleDateString());
            return { ...state, lastDrawDate: action.payload }
        },
        resetOperator: () => {
            localStorage.clear();
            return { money: 0, tickets: [], drawn: false, lastDrawDate: null }
        },
    },
})

export const { setOperatorMoney, setOperatorTickets, setOperatorDrawn, setLastDrawDate, resetOperator } = operatorSlice.actions
export default operatorSlice.reducer