import { IOperatorTicket } from "../store/operatorSlice";
import { ITicket } from "../store/userSlice";

export interface IResult {
    [key: number]: { count: number, prize: number }
}

export const isParsable = (data: any) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

export const generateTicketNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 5) {
        const number = randomIntFromInterval(1, 39);
        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    }
    return numbers;
}

export const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const countScore = (winningNumbers: number[], ticketNumbers: number[]) => winningNumbers.reduce((a, c) => a + (ticketNumbers.includes(c) ? 1 : 0), 0);

export const calculateResults = (playerTickets: ITicket[], operatorTickets: IOperatorTicket[], winningNumbers: number[], results: IResult) => {
    let updatedResults = { ...results }

    playerTickets.forEach((ticket, index) => {
        if (!ticket.drawn) {
            let updatedTicket = { ...ticket }
            const score: number = countScore(winningNumbers, ticket.numbers);
            updatedResults[score].count++;
            updatedTicket.score = score;
            playerTickets[index] = updatedTicket;
        }
    })

    operatorTickets.forEach((ticket, index) => {
        if (!ticket.drawn && ticket.generated) {
            let updatedTicket = { ...ticket }
            const score: number = countScore(winningNumbers, ticket.numbers);
            updatedResults[score].count++;
            updatedTicket.score = score;
            operatorTickets[index] = updatedTicket;
        }
    })
    return updatedResults;
}

export const calculatePrizes = (results: IResult, playerTickets: ITicket[], operatorTickets: IOperatorTicket[]) => {
    const basePrize = 500000 + ((playerTickets.length + operatorTickets.length) * 250);
    let allPaidPrize = 0;
    let allPlayerPrize = 0;
    const drawDate = new Date();

    playerTickets.forEach((ticket, index) => {
        if (!ticket.drawn) {
            let updatedTicket = { ...ticket };
            let prize = 0;
            if (ticket.score >= 2) {
                prize = Math.floor((basePrize * ((ticket.score / 5) / 50)) / results[ticket.score].count);
            }
            updatedTicket.prize = prize;
            updatedTicket.drawn = true;
            updatedTicket.drawDate = drawDate;
            results[ticket.score].prize += prize;
            playerTickets[index] = updatedTicket;
            allPaidPrize += prize;
        }
    })

    allPlayerPrize = allPaidPrize;

    operatorTickets.forEach((ticket, index) => {
        if (!ticket.drawn && ticket.generated) {
            let updatedTicket = { ...ticket };
            let prize = 0;
            if (ticket.score >= 2) {
                prize = Math.floor((basePrize * ((ticket.score / 5) / 50)) / results[ticket.score].count);
            }
            updatedTicket.prize = prize;
            updatedTicket.drawn = true;
            results[ticket.score].prize += prize;
            operatorTickets[index] = updatedTicket;
            allPaidPrize += prize;
        }
    })
    return { allPaidPrize: allPaidPrize, allPlayerPrize: allPlayerPrize, drawDate: drawDate };
}