import React from "react";
import Comment from './comment'

export default function Issue(props) {
  const { title, description, imgUrl, _id, del,} = props;

  function delIssue() {
    del(_id);
  }

  return (
    <div className="issue" key={_id} id={_id}>
      <div className="issueInfo">
        <h1 className="issueTitle">{title}</h1>
        <h3 className="issueDesc">{description}</h3>
        
      </div>
      <img className="issueImg" src={imgUrl} alt={imgUrl} width={300} />
      <div className="buttons">
        <button className="del" onClick={() => delIssue()}>
          Delete
        </button>
      </div>
    </div>
  );
}