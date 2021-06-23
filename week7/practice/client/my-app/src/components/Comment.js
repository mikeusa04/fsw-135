import React from 'react'

export default function Issue(props){
  const { comments  } = props;
  
  return (
    <div className="comment">
   {comments && comments.length > 0
      ? comments.map((comment, index) => (
        <p key={index}>{comment.description}</p>
      ))
      : "No Comments"}
    </div>
  )
}