import "./App.less";
import { useAuth } from "context/auth-context";
import AppAuthenticated from "app-authenticated";
import AppUnauthenticated from "app-unauthenticated";

function App() {
  const { user } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {user ? <AppAuthenticated /> : <AppUnauthenticated />}
    </div>
  );
}

export default App;
