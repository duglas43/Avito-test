import React from "react";
import { Comment } from "antd";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function SceletonComment({ children }) {
  return (
    <div>
      <Comment
        author={
          <div style={{ width: "50px", height: "18px" }}>
            <Skeleton className="w-100 h-100" />
          </div>
        }
        datetime={
          <p
            className="d-inline-block mb-2"
            style={{ width: "50px", height: "18px" }}
          >
            <Skeleton className="w-100 h-100" />
          </p>
        }
        content={
          <p className="" style={{ height: "18px" }}>
            <Skeleton className="w-100 h-100" />
          </p>
        }
      >
        {children}
      </Comment>
    </div>
  );
}
export default SceletonComment;
