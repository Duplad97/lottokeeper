import { useEffect, useState } from "react";
import { IUserState, reset, setUserName } from "../../store/userSlice";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ResetPlayerDialog from "./reset-player-dialog.component";
import { Link } from "react-router-dom";
import TicketDialog from "./ticket-dialog.component";
import TicketList from "./ticket-list.component";

interface IProps {
    player: IUserState
}

function Player(props: IProps) {
    const [player, setPlayer] = useState<IUserState>(props.player);
    const [name, setName] = useState<string>(props.player.name);

    //Dialogs
    const [showResetModal, setShowResetModal] = useState<boolean>(false);
    const [showTicketModal, setShowTicketModal] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setPlayer(props.player);
    }, [props.player])

    const saveName = () => {
        if (name && name.length >= 3) {
            setPlayer({ ...player, name: name });
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
                                <Typography>Akcse: {player.money}</Typography>
                            </div>
                            <Button onClick={() => setShowTicketModal(true)} variant="outlined">Szelvény feladás</Button>
                        </div>

                        <div className="ticket-table-container">
                            <TicketList onlyDrawn={false} data={player.tickets} />
                            <TicketList onlyDrawn={true} data={player.tickets.filter(ticket => ticket.drawn)} />
                        </div>

                        <Button className="reset-button" onClick={() => setShowResetModal(true)} variant="outlined">Visszaállítás</Button>
                    </div>
                    :
                    <div>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} label="Játékos név" />
                        <Button variant="outlined" onClick={saveName}>Mentés</Button>
                    </div>
                }
            </div>

            <ResetPlayerDialog show={showResetModal} setShow={setShowResetModal} />
            <TicketDialog show={showTicketModal} setShow={setShowTicketModal} />
        </>
    )
}
export default Player;