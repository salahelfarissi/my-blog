import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ArticlesListPage from "./pages/ArticlesList";
import ArticlePage from "./pages/Article";

function App() {
  return (
    <div className="App">
      <h1>My Awesome Blog</h1>
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesListPage />} />

          {/* ? This is a URL paramater :articleId */}
          <Route path="/articles/:articleId" element={<ArticlePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
