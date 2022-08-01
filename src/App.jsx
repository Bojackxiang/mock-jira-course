import "./App.css";
import { useAuth } from "context/auth-context";
import AppAuthenticated from "app-authenticated";
import AppUnauthenticated from "app-unauthenticated";
import { ErrorBoundary } from "components/ErrorBoundry";

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      {user ? <AppAuthenticated /> : <AppUnauthenticated />}
    </ErrorBoundary>
  );
}

export default App;
