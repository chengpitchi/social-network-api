const { Schema, Types, model } = require('mongoose');

// Schema to create reaction subdocument 
const reactionSchema = new Schema(
    {
        reactionId: {type: Schema.Types.ObjectId,
                      default: () => new Types.ObjectId()},
        reactionBody: { type: String, 
                        required: true, 
                        maxLength: 280}, 
        username: { type: String, 
                    required: true }, 
        createdAt: { type: Date, default: Date.now },        
    }
); 

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, 
                    required: true, 
                    minLength: 1, 
                    maxLength: 280},
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true }, 
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` 
thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  }); 

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;