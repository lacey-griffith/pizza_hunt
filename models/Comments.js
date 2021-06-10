const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReplySchema = new Schema ({
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String,
        required: 'Replying to a comment requires text!',
        trim: true
    },
    writtenBy: {
        type: String,
        required: 'Must include your name!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema ({
    writtenBy: {
        type: String,
        required: 'Your name is required!'
    },
    commentBody: {
        type: String,
        required: 'Comments must include some text!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

CommentSchema.virtual('replyCount').get(function(){
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;