const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  user: {             //(this is userid) user has relation with many comments = one to many relations
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Comments", commentSchema);


/*we injected the user id in the comments to make one to many relation so 1 user to many comments just like when
we injected the authorid in the books schema in the practice ex. if we would inject the bookid in the auther
schema we would end up with  authot: book1, book2, ...etc, but since we make a relation by adding authorid 
to book schema we will end up with each book to one author, same here making a relation by injecting the userid
in the comments or issue to make a datarelational and we will end up with each comment to a user but if we 
inject the commentsid or issueid in the user schema we would end up with user:comment1, comment2....etc 
*/