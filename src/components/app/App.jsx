import About from "../../pages/about/About";
import MainPage from "../../pages/main-page/MainPage";
import AppHeader from "../app-header/AppHeader";
import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={style.root}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
