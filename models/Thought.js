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
        createdAt: { type: Date, 
                      default: Date.now, 
                      // getter method to format date
                      get: (date) => {
                        if (date) 
                        return `${new Date(date).toLocaleDateString('en-AU')} ${new Date(date).toLocaleTimeString('en-AU')}`;
                      } },        
    }, 
    {
      timestamps: true, 
      toJSON: {
        getters: true,
      },
    }
); 

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, 
                    required: true, 
                    minLength: 1, 
                    maxLength: 280},
    createdAt: { type: Date, 
                  default: Date.now, 
                  // getter method to format date
                  get: (date) => {
                    if (date) 
                    return `${new Date(date).toLocaleDateString('en-AU')} ${new Date(date).toLocaleTimeString('en-AU')}`;
                  } },
    username: { type: String, required: true }, 
    reactions: [reactionSchema],
  },
  {
    timestamp: true, 
    toJSON: {
      getters: true, 
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