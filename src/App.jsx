import './App.css';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ArticlesListPage from './pages/ArticlesList';
import ArticlePage from './pages/Article';

function App() {
  return (
    <div className="App">
      <h1>My Awesome Blog</h1>
      <div id="page-body">
        <HomePage />
        <AboutPage />
        <ArticlesListPage />
        <ArticlePage />
      </div>
    </div>
  );
}

export default App;
