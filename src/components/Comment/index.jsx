import React from "react";
import { Comment } from "antd";
import { timeConverter } from "../../timeConverter";
import Skeleton from "react-loading-skeleton";
function CommentItem({ comment, onCommentClick, isLoadingEnded, type }) {
  const nestedComments = (comment.comments || []).map((comment) => {
    if (comment.deleted) return null;
    return <CommentItem key={comment.id} comment={comment} type="nested" />;
  });
  function createMarkup() {
    return { __html: comment.text };
  }
  let isNestedLoading = React.useRef(false);
  let isFetchNeededRef = React.useRef(comment?.kids && true);
  React.useEffect(() => {
    if (isLoadingEnded) isNestedLoading.current = false;
  }, [isLoadingEnded]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (isFetchNeededRef.current) {
          onCommentClick(comment.id);
          isNestedLoading.current = true;
          isFetchNeededRef.current = false;
        }
      }}
      role={isFetchNeededRef.current && type !== "nested" ? "button" : ""}
    >
      <Comment
        datetime={<p className="d-inline">{timeConverter(comment.time)}</p>}
        author={<p className="d-inline">{comment.by}</p>}
        content={<p dangerouslySetInnerHTML={createMarkup()}></p>}
      >
        {isNestedLoading.current ? (
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
          ></Comment>
        ) : (
          nestedComments
        )}
      </Comment>
    </div>
  );
}
export default CommentItem;
