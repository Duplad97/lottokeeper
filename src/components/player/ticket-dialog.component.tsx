import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ITicket, setMoney, setTickets } from "../../store/userSlice";
import { setOperatorMoney } from "../../store/operatorSlice";

interface IProps {
    show: boolean
    setShow: Function
}

function TicketDialog(props:IProps) {
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

    const user = useSelector((state) => (state as RootState).userReducer);
    const operator = useSelector((state) => (state as RootState).operatorReducer);

    const dispatch = useDispatch();

    const handleNumberClick = (number:number) => {
        const index = selectedNumbers.indexOf(number);
        let updatedSelectedNumbers = [...selectedNumbers];
        if (index >= 0) {
            updatedSelectedNumbers.splice(index, 1);
        } else if (selectedNumbers.length < 5) {
            updatedSelectedNumbers.push(number);
        }
        setSelectedNumbers(updatedSelectedNumbers);
    }

    const createTicket = () => {
        if (user.money > 500) {
            const updatedTickets = [...user.tickets];
            const newTicketData:ITicket = {
                id: updatedTickets.length + 1,
                numbers: selectedNumbers,
                drawn: false,
                date: new Date(),
                score: 0,
            }
            updatedTickets.push(newTicketData);
            dispatch(setTickets(updatedTickets));
            dispatch(setMoney(user.money - 500));
            
            dispatch(setOperatorMoney(operator.money + 500));
            props.setShow(false);
        }
    }

    const renderNumbers = () => {
        const numbers = [];
        for (let i = 1; i <= 39; i++) {
            numbers.push(<Card key={Math.random()} className="number-card" sx={{backgroundColor: selectedNumbers.includes(i) ? "lightgreen" : ""}} onClick={() => handleNumberClick(i)}>{i}</Card>);
        }
        return (
            <div className="number-card-container">
                {numbers.map(number => {
                    return number
                })}
            </div>
        )
    }

    return (
        <Dialog open={props.show} className="ticket-dialog">
            <DialogTitle>
                {"Szelvény"}
            </DialogTitle>
            <DialogContent>
                {renderNumbers()}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setShow(false)}>Mégsem</Button>
                <Button onClick={createTicket} autoFocus>Szelvény feladása</Button>
            </DialogActions>
        </Dialog>
    )
}
export default TicketDialog;