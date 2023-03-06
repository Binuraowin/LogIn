const mongoose = require("mongoose");
const mongooseLeanDefaults = require("mongoose-lean-defaults").default;

const UserSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String,

  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(mongooseLeanDefaults);

UserSchema.index({ createdAt: 1 });
UserSchema.index({ updatedAt: 1 });
UserSchema.index({ email: 1 });


const User = mongoose.model("User", UserSchema);
User.syncIndexes();
module.exports = User;
