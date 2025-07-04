import RoutesPrivated from "./routesPrivated.js";
import RoutesOpen from "./routesOpen.js";

function Routes(){
    const user = {
        id_user: true // Simulating user state, replace with actual user state management
    };
    return  user.id_user ? <RoutesPrivated /> : <RoutesOpen />;
}

export default Routes;