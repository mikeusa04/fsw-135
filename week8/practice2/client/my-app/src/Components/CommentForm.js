import React, { useContext, useState } from "react";
import { UserContext } from "./../Context/userContext";
const initInputs = { comment: "" };
export default function CommentForm(props) {
  const { toggleComment } = props;
  const { commentPost } = useContext(UserContext);
  const [inputs, setInputs] = useState(initInputs);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    commentPost(event, inputs);
    setInputs(initInputs);
    toggleComment()
  }

  const { comment } = inputs;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Comment"
          className=""
          name="comment"
          value={comment}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
      <button onClick={toggleComment}>Cancel</button>
    </div>
  );
}