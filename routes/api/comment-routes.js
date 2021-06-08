const router = require('express').Router();
const { addComment, removeComment} = require('../../controllers/comment-controllers');

// add comment to a pizza
router
.route('/:pizzaId')
.post(addComment);

//remove comment from a pizza
router
.route('/:pizzaId/:commentId')
.delete(removeComment);

module.exports = router;