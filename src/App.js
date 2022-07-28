import "./App.css";
// import ProjectList from "lab/project-list";
import LoginScreen from "screens/login";
import { AuthProvider } from "context/auth-context";

function App() {
  return (
    // <ProjectList />
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}

export default App;
