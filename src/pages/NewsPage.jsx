import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CommentItem, SceletonComment } from "../components/";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchFullNews,
  selectFullNews,
  getExpandComment,
  fetchComments,
} from "../redux/slices/FullNewsSlice.js";
import { timeConverter } from "../timeConverter";
function NewsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { news, newsStatus, comments, commentsStatus, nestedStatus } =
    useSelector(selectFullNews);
  const handleCommentClick = (id) => {
    dispatch(getExpandComment(id));
  };
  const handleUpdateCommentClick = () => {
    dispatch(fetchComments(id));
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchFullNews(id));
    dispatch(fetchComments(id));
  }, []);
  return (
    <div>
      <Container>
        <h1 className="text-center pt-3">
          {newsStatus === "success" && news?.title}
        </h1>
        <div className="">
          <div className="d-flex flex-wrap ">
            <p className=" me-4 fs-5 mb-lg-0 text-secondary">
              Автор: {newsStatus === "success" && news?.by}
            </p>
            <p className=" me-4 fs-5 mb-lg-0 text-secondary">
              Дата: {newsStatus === "success" && timeConverter(news?.time)}
            </p>
            <p className=" me-4 fs-5 mb-lg-0 text-secondary">
              Рейтинг: {newsStatus === "success" && news?.score}
            </p>
          </div>
          <h2>
            <a className="fs-5" target="blank" href={news?.url || ""}>
              Ссылка на новость
            </a>
          </h2>
          <div className="fs-5 d-inline-flex align-items-center">
            <Link to="/">
              <i
                className="fa-solid fa-chevron-left text-black"
                style={{ position: "relative", top: "2px", left: "0" }}
              ></i>
              <span className="mb-0 text-black">Назад к новостям</span>
            </Link>
          </div>
          <hr />
          <h3 className="text-center">
            Комментарии. Всего:{news.descendants}{" "}
          </h3>
          <p
            role="button"
            onClick={() => handleUpdateCommentClick()}
            className="d-inline-block fs-4 mb-0 pt-2"
          >
            <i className="fa-solid fa-rotate-right me-2"></i> Обновить
            комментарии
          </p>
          <div>
            {commentsStatus === "success"
              ? comments?.map((comment) => {
                  if (comment.deleted || comment.dead) return null;
                  return (
                    <CommentItem
                      key={comment.id}
                      onCommentClick={handleCommentClick}
                      comment={comment}
                      isLoadingEnded={nestedStatus === "loading"}
                    />
                  );
                })
              : Array(20)
                  .fill(0)
                  .map((_, index) => <SceletonComment key={index} />)}
          </div>
        </div>
      </Container>
    </div>
  );
}
export default NewsPage;
