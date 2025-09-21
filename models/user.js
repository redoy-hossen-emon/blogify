const { createHmac, randomBytes } = require("crypto")
const { default: mongoose } = require("mongoose");
const { type } = require("os");
const { createTokenForUser } = require("../servises/authentication");
const { Schema } = mongoose;


const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profilePicURL: {
    type: String,
    default: "defaultImg.png",
  }

}, { timestamps: true })


userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex")
  user.salt = salt;
  user.password = hashedPassword;
  next();

});

// userSchema.static
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email or Password are Wrong!");
  }

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedPass = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedPass) {
    throw new Error("Email or Password are Wrong!");
  }

  // Convert to plain object & remove sensitive fields
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.salt;

  const token = createTokenForUser(userObj)

  return token;
});
const User = mongoose.model("user", userSchema);


module.exports = User