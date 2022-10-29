import React from "react";
import { Card } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function SceletonCard() {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="m-0 w-50">
          <Skeleton />
        </Card.Title>
        <Card.Subtitle className=" mt-1 text-muted d-flex flex-wrap">
          <p className="me-2 mb-0">
            Рейтинг:{" "}
            {
              <SkeletonTheme inline>
                <Skeleton width={50} />
              </SkeletonTheme>
            }
          </p>
          <p className="me-2  mb-0">
            Автор:{" "}
            {
              <SkeletonTheme inline>
                <Skeleton width={50} />
              </SkeletonTheme>
            }
          </p>
          <p className="me-2  mb-0">
            Дата публикации:{" "}
            {
              <SkeletonTheme inline>
                <Skeleton width={50} />
              </SkeletonTheme>
            }
          </p>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
export default SceletonCard;
