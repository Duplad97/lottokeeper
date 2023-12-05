import { useState } from "react";
import { setUserName } from "../../store/userSlice";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ResetDialog from "../../_helper/reset-dialog.component";
import { Link } from "react-router-dom";
import TicketDialog from "./ticket-dialog.component";
import TicketList from "./ticket-list.component";
import { RootState } from "../../store/store";

interface IProps {
}

function Player(props: IProps) {
    const player = useSelector((state) => (state as RootState).userReducer);

    const [name, setName] = useState<string>(player.name);

    //Dialogs
    const [showResetModal, setShowResetModal] = useState<boolean>(false);
    const [showTicketModal, setShowTicketModal] = useState<boolean>(false);

    const dispatch = useDispatch();

    const saveName = () => {
        if (name && name.length >= 3) {
            dispatch(setUserName(name));
        }
    }

    return (
        <>
            <div className="player">
                <Link to="/">
                    <Button variant="outlined">Vissza</Button>
                </Link>
                {player.name ?
                    <div>
                        <div className="player-details">
                            <div>
                                <Typography>Név: {player.name}</Typography>
                                <Typography>Akcse: {Intl.NumberFormat('hu-HU', { maximumSignificantDigits: 3 }).format(player.money)}</Typography>
                            </div>
                            <Button onClick={() => setShowTicketModal(true)} variant="outlined">Szelvény feladás</Button>
                        </div>

                        <div className="ticket-table-container">
                            <TicketList onlyDrawn={false} data={player.tickets} />
                            <TicketList onlyDrawn={true} data={player.tickets.filter(ticket => ticket.drawn)} />
                        </div>
                    </div>
                    :
                    <div className="player-name-form">
                        <TextField value={name} onChange={(e) => setName(e.target.value)} label="Játékos név" />
                        <Button variant="outlined" onClick={saveName}>Mentés</Button>
                    </div>
                }
            </div>

            <ResetDialog show={showResetModal} setShow={setShowResetModal} />
            <TicketDialog show={showTicketModal} setShow={setShowTicketModal} />
        </>
    )
}
export default Player;