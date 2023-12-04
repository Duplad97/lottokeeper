import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Home from "./pages/home.page";
import PlayerPage from "./pages/player.page";
import OperatorPage from "./pages/operator.page";

const routes = [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/player",
        component: PlayerPage,
        exact: true,
    },
    {
        path: "/operator",
        component: OperatorPage,
        exact: true,
    }
]

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                {routes.map(route => {
                    return (
                        <Route exact={route.exact} key={Math.random()} path={route.path} component={route.component}/>
                    )
                })}
            </Switch>
        </BrowserRouter>
    )
}
export default Router;