import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="home-page">
            <div className="logo-container">
                <Typography className="logo" variant="h1">Lottokeeper</Typography>
            </div>

            <div className="button-group">
                <Link to="/player">
                    <Button variant="contained">Játékos</Button>
                </Link>

                <Link to="/operator">
                    <Button variant="contained">Üzemeltető</Button>
                </Link>
            </div>
        </div>
    )
}
export default Home;