import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const ProtectedRoutes = ({children}) => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    useEffect(() => {
      const loggedInUser = localStorage.getItem("authenticated");
      if (loggedInUser) {
        setAuthenticated(loggedInUser);
      }
    }, []);

    if(!authenticated) {
        return <Navigate to="/login" replace/>;
    }
    return (children);

}
export default ProtectedRoutes;