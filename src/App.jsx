import "./App.css";
import { useAuth } from "context/auth-context";
import AppAuthenticated from "app-authenticated";
import AppUnauthenticated from "app-unauthenticated";
import { ErrorBoundary } from "components/ErrorBoundry";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <Router>{user ? <AppAuthenticated /> : <AppUnauthenticated />}</Router>
    </ErrorBoundary>
  );
}

export default App;
