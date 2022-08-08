import "./App.css";
import { ErrorBoundary } from "components/ErrorBoundry";
import { BrowserRouter as Router } from "react-router-dom";
import useAuthReduxHook from "redux/useAuthReduxHook";
import React from "react";
import { Spin } from "antd";

const AuthenticatedApp = React.lazy(() => import("app-authenticated"));
const UnauthenticatedApp = React.lazy(() => import("app-unauthenticated"));

function App() {
  // read user from the context
  // const { user } = useAuth();
  const { user } = useAuthReduxHook();

  // control the modal basing on the url

  return (
    <ErrorBoundary>
      {
        <React.Suspense fallback={<Spin size="large" />}>
          <Router>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
          </Router>
        </React.Suspense>
      }
    </ErrorBoundary>
  );
}

export default App;
