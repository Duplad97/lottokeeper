import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IOperatorTicket, setOperatorDrawn, setOperatorMoney, setOperatorTickets } from "../../store/operatorSlice";
import OperatorTicketList from "./operator-ticket-list.component";
import ResetDialog from "../../_helper/reset-dialog.component";
import { RootState } from "../../store/store";
import { generateTicketNumbers } from "../../_helper/helper-functions";
import { orderBy } from "lodash";
import DrawTicketsDialog from "./draw-tickets-dialog.component";

interface IProps {
}

function Operator(props: IProps) {
    const [generateCount, setGenerateCount] = useState<number>(1);
    const [tickets, setTickets] = useState<IOperatorTicket[]>([]);

    //Dialogs
    const [showResetModal, setShowResetModal] = useState<boolean>(false);
    const [showDrawModal, setShowDrawModal] = useState<boolean>(false);

    const user = useSelector((state) => (state as RootState).userReducer);
    const operator = useSelector((state) => (state as RootState).operatorReducer)

    const dispatch = useDispatch();

    useEffect(() => {
        initializeTickets();
    }, [operator, user])

    const initializeTickets = () => {
        const allTickets = [...operator.tickets];
        user.tickets.forEach(ticket => {
            if ((!operator.drawn && !ticket.drawn) || (operator.drawn && (operator.lastDrawDate === ticket.drawDate))) {
                allTickets.push({ ...ticket, generated: false, id: allTickets.length + 2 });
            }
        })
        setTickets(allTickets);
    }

    const generateTickets = () => {
        const updatedTickets = [...operator.tickets];
        for (let i = 0; i < generateCount; i++) {
            const numbers: number[] = generateTicketNumbers();
            const ticketData: IOperatorTicket = {
                id: updatedTickets.length + 1,
                numbers: numbers,
                generated: true,
                drawn: false,
                date: new Date(),
                score: 0
            }
            updatedTickets.push(ticketData);
        }
        dispatch(setOperatorTickets(updatedTickets));

        const updatedMoney = operator.money + (generateCount * 500);
        dispatch(setOperatorMoney(updatedMoney));
        setGenerateCount(1);
    }

    const newTurn = () => {
        dispatch(setOperatorDrawn(false));
        dispatch(setOperatorTickets([]));
    }

    const hasTicketToDraw = () => {
        return orderBy(tickets, "generated").filter(ticket => !ticket.drawn).length > 0;
    }

    return (
        <>
            <div className="operator">
                <Link to="/">
                    <Button variant="outlined">Vissza</Button>
                </Link>

                <div>
                    <div className="operator-details">
                        <div>
                            <Typography>Operátor</Typography>
                            <Typography>Akcse: {Intl.NumberFormat('hu-HU', { maximumSignificantDigits: 3 }).format(operator.money)}</Typography>
                        </div>


                        <div className="simulate-form-container">
                            <input value={generateCount} onChange={(e) => setGenerateCount(parseInt(e.target.value))} className="ticket-count" type="number" min={1} max={999} />
                            <Button onClick={generateTickets} className="generate-button" variant="outlined">Szelvények generálása</Button>
                        </div>
                    </div>
                    <div className="ticket-table-container">
                        {!operator.drawn ? <Button disabled={!hasTicketToDraw()} onClick={() => setShowDrawModal(true)} variant="outlined">Húzás indítása</Button> : <Button variant="outlined" onClick={newTurn}>Új kör</Button>}

                        <OperatorTicketList drawn={operator.drawn} data={ operator.drawn ? orderBy(tickets, "generated") : orderBy(tickets, "generated").filter(ticket => !ticket.drawn)} />
                    </div>

                    <Button className="reset-button" onClick={() => setShowResetModal(true)} variant="outlined">Új játék</Button>
                </div>

            </div>

            <ResetDialog show={showResetModal} setShow={setShowResetModal} />
            <DrawTicketsDialog show={showDrawModal} setShow={setShowDrawModal} />
        </>
    )
}
export default Operator;