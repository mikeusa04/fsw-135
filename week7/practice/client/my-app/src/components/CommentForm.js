import React, { useState } from 'react'

const initInputs = {
  comment: ""
}

export default function CommentForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { issueID, addComment } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addComment(inputs, issueID)
    setInputs(initInputs)
  }

  const { comment } = inputs

  return (
    <div className='comment-container'>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="comment" 
        value={comment} 
        onChange={handleChange} 
        placeholder="Comment"/>
      <button className='comment-button' >Add Comment</button>
    </form>
    </div>
  )
}