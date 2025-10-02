import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

function AppContent() {
  return <AppLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
