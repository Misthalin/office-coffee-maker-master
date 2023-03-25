import { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/AuthContext";

const Logout = () => {
  const { logoutUser } = useContext(AuthContext);
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);
  return null;
};

export default Logout;
