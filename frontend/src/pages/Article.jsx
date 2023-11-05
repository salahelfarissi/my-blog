import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFound";

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  if (!article) return <NotFoundPage />;

  return (
    <>
      <h1>{article?.title}</h1>
      {/* ? key arg corresponds to index */}
      {/* Don't use index if the list items will be added to or removed */}
      {article?.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
    </>
  );
};

export default ArticlePage;