import { BrowserRouter as Router } from "react-router-dom";
import RoutesView from "./routes/RoutesView";
import FooterComp from "./components/FooterComp";
import NavbarComp from "./components/NavbarComp";
import "/src/css/style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComp />
        <main className="main-content">
          <RoutesView />
        </main>
        <FooterComp />
      </div>
    </Router>
  );
}

export default App;
