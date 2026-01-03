import About from "../../pages/about/About";
import MainPage from "../../pages/main-page/MainPage";
import BlogList from "../../pages/blog-list/BlogList";
import BlogPost from "../../pages/blog-post/BlogPost";
import AppHeader from "../app-header/AppHeader";
import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Bar } from "../bar/Bar";

function App() {
  return (
    <div className={style.root}>
      <AppHeader />
      <Bar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
      </Routes>
    </div>
  );
}

export default App;
