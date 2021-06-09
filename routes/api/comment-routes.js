const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply} = require('../../controllers/comment-controllers');

// add comment to a pizza
router
.route('/:pizzaId')
.post(addComment);

//remove comment from a pizza, add reply to comment
router
.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

router
.route('/:pizzaId/:commentId/:replyId')
.delete(removeReply);

module.exports = router;