import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { reset } from "../../store/userSlice";

interface IProps {
    show: boolean
    setShow: Function
}

function ResetPlayerDialog(props:IProps) {

    const dispatch = useDispatch();
    
    const resetGame = () => {
        dispatch(reset());
        props.setShow(false);
    }

    return (
        <Dialog open={props.show}>
            <DialogTitle>
                {"Visszaállítás"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Biztosan visszaállítja a játék állását? Ez minden adatot törölni fog!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setShow(false)}>Mégsem</Button>
                <Button onClick={resetGame} autoFocus>Visszaállítás</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ResetPlayerDialog;