import React, { useContext, useEffect} from 'react'
import CommentForm from './CommentForm.js'
import CommentList from './CommentList.js'
import { IssueContext } from '../context/IssueProvider.js'

export default function Issue(props){
  const {
    addComment,
    getIssueComments,
  } = useContext(IssueContext)

   useEffect(() => {
    getIssueComments(_id)
  }, []); 

  const { title, description, likes, dislikes, _id} = props

  return (
    <div className="issue">
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <h5 className='likes'> Likes:  {likes}</h5>
      <h5 className='dislikes'>Dislikes : {dislikes}</h5>
      <h5>Comments: </h5>
      <CommentList issueID={_id} />
      <h5>Leave a Comment: </h5>
      <CommentForm issueID={_id} addComment={addComment}/>  
    </div>
  )
}