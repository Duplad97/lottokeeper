import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Player from "../components/player/player.component";

function PlayerPage() {

    const user = useSelector((state) => (state as RootState).userReducer)

    return (
        <div className="player-page">
            <Player player={user}/>
        </div>
    )
}
export default PlayerPage;