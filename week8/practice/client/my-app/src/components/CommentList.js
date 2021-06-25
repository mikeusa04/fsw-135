import React, { useContext, useEffect, useState } from 'react'
import Comment from './Comment.js'
import { IssueContext } from '../context/IssueProvider.js'

export default function CommentList(props) {
  const {
    comments
  } = useContext(IssueContext)
 console.log(comments)
  const { issueID  } = props;

  return (
    <div className="comment-list">
      {comments && comments.length > 0
        ? comments.map(comment => {
          return <Comment {...comment} key={comment.issueID} issueID = {issueID} />
        })
        : "No Comments"}
    </div>
  )
}