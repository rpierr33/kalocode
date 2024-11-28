import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Show a loading state while checking if the user is authenticated
    return <div>Loading...</div>;
  }

  if (!user) {
    // If no user is authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the requested page
  return children;
};

export default PrivateRoute;
