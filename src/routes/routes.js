import RoutesPrivated from "./routesPrivated.js";
import RoutesOpen from "./routesOpen.js";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.js";

function Routes() {

    const { user } = useContext(AuthContext)

    return user.id ? <RoutesPrivated /> : <RoutesOpen />;
}

export default Routes;