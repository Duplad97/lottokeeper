import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setMoney, setTickets } from "../../store/userSlice";
import { setLastDrawDate, setOperatorDrawn, setOperatorMoney, setOperatorTickets } from "../../store/operatorSlice";
import { IResult, calculatePrizes, calculateResults, generateTicketNumbers } from "../../_helper/helper-functions";

interface IProps {
    show: boolean
    setShow: Function
}

const defaultResults: IResult = { 0: { count: 0, prize: 0 }, 1: { count: 0, prize: 0 }, 2: { count: 0, prize: 0 }, 3: { count: 0, prize: 0 }, 4: { count: 0, prize: 0 }, 5: { count: 0, prize: 0 } };

function DrawTicketsDialog(props: IProps) {
    const [results, setResults] = useState<IResult>({ ...defaultResults });
    const [allPrize, setAllPrize] = useState<number>(0);

    const player = useSelector((state) => (state as RootState).userReducer);
    const operator = useSelector((state) => (state as RootState).operatorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.show) {
            simulateDrawing();
        }
    }, [props.show])

    const closeDialog = () => {
        props.setShow(false);
        setResults({ 0: { count: 0, prize: 0 }, 1: { count: 0, prize: 0 }, 2: { count: 0, prize: 0 }, 3: { count: 0, prize: 0 }, 4: { count: 0, prize: 0 }, 5: { count: 0, prize: 0 } });
    }

    const simulateDrawing = () => {
        const winningNumbers = generateTicketNumbers();
        let updatedPlayerTickets = [...player.tickets];
        let updatedOperatorTickets = [...operator.tickets];

        let updatedResults = calculateResults(updatedPlayerTickets, updatedOperatorTickets, winningNumbers, results);

        setResults(updatedResults);

        const prize = calculatePrizes(updatedResults, updatedPlayerTickets, updatedOperatorTickets);
        setAllPrize(prize.allPaidPrize);

        dispatch(setTickets(updatedPlayerTickets));
        dispatch(setOperatorTickets(updatedOperatorTickets));
        dispatch(setMoney(player.money + prize.allPlayerPrize));
        dispatch(setOperatorMoney(operator.money - prize.allPaidPrize));
        dispatch(setOperatorDrawn(true));
        dispatch(setLastDrawDate(prize.drawDate));
    }

    const renderResults = () => {
        return (
            <>
                <Typography>5 találatos szelvény: {results[5].count} db | Nyeremény: {results[5].prize} akcse (szelvényenként {results[5].count ? Math.floor(results[5].prize / results[5].count) : 0} akcse)</Typography>
                <Typography>4 találatos szelvény: {results[4].count} db | Nyeremény: {results[4].prize} akcse (szelvényenként {results[4].count ? Math.floor(results[4].prize / results[4].count) : 0} akcse)</Typography>
                <Typography>3 találatos szelvény: {results[3].count} db | Nyeremény: {results[3].prize} akcse (szelvényenként {results[3].count ? Math.floor(results[3].prize / results[3].count) : 0} akcse)</Typography>
                <Typography>2 találatos szelvény: {results[2].count} db | Nyeremény: {results[2].prize} akcse (szelvényenként {results[2].count ? Math.floor(results[2].prize / results[2].count) : 0} akcse)</Typography>
                <Typography>Nyeretlen szelvény: {results[0].count + results[1].count} db</Typography>
            </>
        )
    }

    const renderTotalResults = () => {
        let allTicketCount = 0
        Object.keys(results).forEach((key:string) => {
            allTicketCount += results[parseInt(key)].count;
        })
        const income = (allTicketCount * 500);
        const totalIncome = income - allPrize;

        return (
            <div className="all-prize-text">
                <Typography variant="h6">Össznyeremény: {Intl.NumberFormat('hu-HU', { maximumSignificantDigits: 3 }).format(allPrize)} akcse</Typography>
                <Typography variant="h6">Összes szelvény: {allTicketCount}db</Typography>
                <Typography variant="h6">Összes bevétel: {Intl.NumberFormat('hu-HU', { maximumSignificantDigits: 3 }).format(income)} akcse</Typography>
                <Typography variant="h6">Nyereség: {Intl.NumberFormat('hu-HU', { maximumSignificantDigits: 3 }).format(totalIncome)} akcse</Typography>
            </div>
        )
    }

    return (
        <Dialog open={props.show} className="draw-tickets-dialog">
            <DialogTitle>
                {"Húzás eredménye"}
            </DialogTitle>
            <DialogContent>
                <div className="scores">
                    {renderResults()}
                    {renderTotalResults()}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Bezárás</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DrawTicketsDialog;