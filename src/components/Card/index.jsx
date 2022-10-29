import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function CardItem({ title, author, rating, date, id }) {
  return (
    <Link className="text-black" to={`/news/${id}`}>
      <div className="card__wrapper">
        <Card>
          <Card.Body>
            <Card.Title className="m-0">{title}</Card.Title>
            <Card.Subtitle className=" mt-1 text-muted d-flex flex-wrap">
              <p className="me-2 mb-0">Рейтинг: {rating}</p>
              <p className="me-2  mb-0">Автор: {author}</p>
              <p className="me-2  mb-0">Дата публикации: {date}</p>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
}
export default CardItem;
