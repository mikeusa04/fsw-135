import React from 'react'

export default function Issue(props){
  const { title, description, likes, dislikes } = props
  return (
    <div className="issue">
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <h5>Likes:  {likes}</h5>
      <h5>Dislikes: {dislikes}</h5>
    </div>
  )
}