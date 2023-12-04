import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { isParsable } from "../_helper/helper-functions"

export interface ITicket {
    id: number
    numbers: number[]
    drawn: boolean
    date: Date
    score?: number
    prize?: number
}

export interface IUserState {
    name: string
    money: number
    tickets: ITicket[]
}

const initialState: IUserState = {
    name: localStorage.getItem("name") || "",
    money: parseInt(localStorage.getItem("money") || "10000"),
    tickets: isParsable(localStorage.getItem("tickets")) || []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName: (state: IUserState, action: PayloadAction<string>) => {
            localStorage.setItem("name", action.payload);
            return { ...state, name: action.payload }
        },
        setMoney: (state: IUserState, action: PayloadAction<number>) => {
            localStorage.setItem("money", action.payload.toString());
            return { ...state, money: action.payload }
        },
        setTickets: (state: IUserState, action: PayloadAction<ITicket[]>) => {
            localStorage.setItem("tickets", JSON.stringify(action.payload));
            return { ...state, tickets: action.payload }
        },
        reset: () => {
            localStorage.clear();
            return { name: "", money: 10000, tickets: [] }
        },
    },
})

export const { setUserName, setMoney, setTickets, reset } = userSlice.actions
export default userSlice.reducer