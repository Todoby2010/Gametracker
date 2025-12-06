import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

export default App;