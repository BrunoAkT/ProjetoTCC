import RoutesPrivated from "./routesPrivated.js";
import RoutesOpen from "./routesOpen.js";

function Routes(){
    const user = {
        id_user: false
    };
    return  user.id_user ? <RoutesPrivated /> : <RoutesOpen />;
}

export default Routes;