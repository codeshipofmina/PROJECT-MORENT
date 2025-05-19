import { useAuthContext } from "../contexts/auth-context";
import { Navigate, Outlet, useLocation } from "react-router";

export default function ProtectedRoute() {
  const { session, isLoading } = useAuthContext();
  const { pathname } = useLocation();
  // * Falls wir geprueft haben ob es einen eingeloggten user gibt (isLoaging), er aber nicht existiert,
  // * leiten wir weiter zur Loginseite
  if (!isLoading && !session) {
    return <Navigate to="/login?" state={{ redirectTo: pathname }} />;
  }

  return <Outlet />;
}
