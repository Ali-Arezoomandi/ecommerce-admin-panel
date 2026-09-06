import "./App.css";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/SideBar";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
    const router = useRoutes(routes);

    return (
        <ThemeProvider>
            <div className="dashboard-container">
                <Header />
                <div className="dashboard-body">
                    <SideBar />
                    <main className="main-content">{router}</main>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
