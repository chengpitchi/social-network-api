const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, 
                required: true, 
                unique: true, 
                trim: true 
            },
    email: { type: String, 
                required: true, 
                unique: true, 
                // for email validation
                match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
            },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],  
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount`
userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  }); 

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;