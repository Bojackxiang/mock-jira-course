import "./App.less";
import { useAuth } from "context/auth-context";
import AppAuthenticated from "app-authenticated";
import AppUnauthenticated from "app-unauthenticated";

function App() {
  const { user } = useAuth();

  return <>{user ? <AppAuthenticated /> : <AppUnauthenticated />}</>;
}

export default App;
