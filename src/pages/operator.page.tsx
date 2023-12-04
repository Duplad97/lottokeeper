import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Operator from "../components/operator/operator.component";

function OperatorPage() {

    const operator = useSelector((state) => (state as RootState).operatorReducer)

    return (
        <div className="operator-page">
            <Operator operator={operator} />
        </div>
    )
}
export default OperatorPage;