import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFound";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/articles/${articleId}`);
      const body = result.data;

      setArticleInfo(body);
    };

    fetchData();
  }, [articleId]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const result = await axios.put(`/api/articles/${articleId}/upvote`);
    const body = result.data;

    setArticleInfo(body);
  };

  if (!article) return <NotFoundPage />;

  return (
    <>
      <h1>{article?.title}</h1>
      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvotes} upvote(s).</p>
      </div>
      {/* ? key arg corresponds to index */}
      {/* Don't use index if the list items will be added to or removed */}
      {article?.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
