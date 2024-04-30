import { Navigate, Outlet } from "react-router-dom";
import { checkIfLoggedIn } from "../pocketbaseUitl";

const PrivateRoute = () => {
  return checkIfLoggedIn() ? <Outlet /> : <Navigate to="/join" />;
};

export default PrivateRoute;
