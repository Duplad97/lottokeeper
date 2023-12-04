import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IOperatorState } from "../../store/operatorSlice";

interface IProps {
    operator: IOperatorState
}

function Operator(props: IProps) {
    const [operator, setOperator] = useState<IOperatorState>(props.operator);

    const dispatch = useDispatch();

    useEffect(() => {
        setOperator(props.operator);
    }, [props.operator])

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
                                <Typography>Akcse: {operator.money}</Typography>
                            </div>
                            
                        </div>

                    </div>
                   
            </div>
        </>
    )
}
export default Operator;