import React from "react";
import { Container } from "react-bootstrap";
import { CardItem, SceletonCard } from "../components";
import { fetchNewsList, selectNewsList } from "../redux/slices/newsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { timeConverter } from "../timeConverter";
function MainPage() {
  const dispatch = useDispatch();
  const { newsList, newsListStatus } = useSelector(selectNewsList);
  const handleUpdateClick = () => {
    dispatch(fetchNewsList());
  };
  const newsListItems = newsList.map((item, index) => {
    return (
      <div className="col-12 gy-3" key={index}>
        <CardItem
          title={item.title}
          rating={item.score}
          author={item.by}
          date={timeConverter(item.time)}
          id={item.id}
        />
      </div>
    );
  });
  const newsListSceleton = Array(10)
    .fill(0)
    .map((_, index) => {
      return (
        <div className="col-12 gy-3" key={index}>
          <SceletonCard />
        </div>
      );
    });
  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchNewsList());
    let timerId = setInterval(() => {
      dispatch(fetchNewsList());
    }, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div>
      <Container>
        <p
          onClick={() => handleUpdateClick()}
          role="button"
          className="d-inline-block fs-4 mb-0 pt-2"
        >
          <i className="fa-solid fa-rotate-right me-2"></i> Обновить новости
        </p>
        <div className="row">
          {newsListStatus === "success" ? (
            newsListItems
          ) : newsListStatus === "failed" ? (
            <div className="col-12 text-center fs-1">
              Произошла ошибка, попробуйте перезагрузить страницу
            </div>
          ) : (
            newsListSceleton
          )}
        </div>
      </Container>
    </div>
  );
}
export default MainPage;
