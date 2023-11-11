import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFound";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../Hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();
  const { user, loading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authToken: token } : {};
      const result = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const body = result.data;

      setArticleInfo(body);
    };

    if (!loading) loadArticleInfo();
  }, [articleId, user, loading]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authToken: token } : {};
    const result = await axios.put(`/api/articles/${articleId}/upvote`, null, {
      headers,
    });
    const body = result.data;

    setArticleInfo(body);
  };

  if (!article) return <NotFoundPage />;

  return (
    <>
      <h1>{article?.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already upvoted"}
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvote(s).</p>
      </div>
      {/* ? key arg corresponds to index */}
      {/* Don't use index if the list items will be added to or removed */}
      {article?.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log in to comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
