const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  // in order to use our taskCount virtual below we must set this 
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash the user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare and validate password for logging in 
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// this will keep track of the number of tasks the user has when queried
userSchema.virtual('taskCount').get(function () {
  return this.tasks.length;
});


const User = model('User', userSchema);

module.exports = User;
