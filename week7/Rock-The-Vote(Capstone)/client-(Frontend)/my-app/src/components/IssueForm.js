import React, { useState } from 'react'

const initInputs = {
  title: "",
  description: ""
}

export default function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addIssue, getIssues } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addIssue(inputs)
    setInputs(initInputs)
    getIssues()
  }

  const { title, description } = inputs
  return (
    <div className="formGrid">
    <h2 className="addHeader">Add an Issue</h2>
    <form className="issueForm" onSubmit={handleSubmit}>
      <input 
        className="issueInputTitle"
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"
      />
      <input 
        className="issueInputDesc"
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"
        />
      {/* <input 
        type="text" 
        name="imgUrl" 
        value={imgUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/> */}
      <button className="subIssueBtn">Add Issue</button>
    </form>
    </div>
  )
}