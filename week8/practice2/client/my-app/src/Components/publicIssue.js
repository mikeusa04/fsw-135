import React, { useState, useContext } from "react";
import { UserContext } from "../Context/userContext";
import CommentForm from "./CommentForm";
import Comment from "./comment";
export default function PublicIssue(props) {
  const {
    title,
    description,
    imgUrl,
    _id,
    upVote,
    downVote,
    upVotes,
    downVotes,
  } = props;

  const { getComments, issueComments } = useContext(UserContext);
  const [comment, setComment] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  function toggleComment() {
    setComment((prevComment) => !prevComment);
  }

  function toggleDisplay() {
    setDisplayComments((prevDisplayComment) => !prevDisplayComment);
    console.log(issueComments);
    getComments(_id);
    // if (!displayComments) {
    //   console.log(_id)
    // }
  }

  return (
    <div className="publicIssue" key={_id} id={_id}>
      <h1 className="issueTitle">{title}</h1>
      <h3 className="issueDesc">{description}</h3>
      <img className="issueImg" src={imgUrl} alt={imgUrl} width={300} />
      <h3>Up Votes: {upVotes}</h3>
      <h3>Down Votes: {downVotes}</h3>

      {displayComments ? (
        issueComments.map((comment) => (
          <Comment {...comment} key={comment._id} />
        ))
      ) : (
        <button onClick={toggleDisplay}>Comments</button>
      )}

      {displayComments ? (
        <button onClick={toggleDisplay}>Hide Comments</button>
      ) : (
        ""
      )}

      {comment ? (
        <CommentForm toggleComment={toggleComment} />
      ) : (
        <button onClick={toggleComment}>Post a Comment</button>
      )}

      <button
        className="edit"
        onClick={() => {
          upVote(_id);
        }}
      >
        Up Vote
      </button>
      <button
        className="edit"
        onClick={() => {
          downVote(_id);
        }}
      >
        Down Vote
      </button>
    </div>
  );
}