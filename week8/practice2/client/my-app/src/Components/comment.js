import React from "react";
export default function Comment(props) {
  const { comment } = props;
  return (
    <div>
      <h3>{comment}</h3>
    </div>
  );
}