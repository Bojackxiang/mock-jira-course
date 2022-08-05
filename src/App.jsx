import "./App.css";
import AppAuthenticated from "app-authenticated";
import AppUnauthenticated from "app-unauthenticated";
import { ErrorBoundary } from "components/ErrorBoundry";
import { BrowserRouter as Router } from "react-router-dom";
import useAuthReduxHook from "redux/useAuthReduxHook";

function App() {
  // read user from the context
  // const { user } = useAuth();
  const { user } = useAuthReduxHook();

  // control the modal basing on the url

  return (
    <ErrorBoundary>
      <Router>{user ? <AppAuthenticated /> : <AppUnauthenticated />}</Router>
    </ErrorBoundary>
  );
}

export default App;
