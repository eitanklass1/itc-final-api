const loginSchema = {
  type: "object",
  properties: {
    nickname: { type: "string" },
    password: { type: "string" },
    email: { type: "string", pattern: "[@]+" },
    score: { type: "number" },
  },
  required: ["password", "email"],
  additionalProperties: false,
};
const signupSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    nickname: { type: "string" },
    password: { type: "string" },
    rePassword: { type: "string" },
    email: { type: "string", pattern: "[@]+" },
    score: { type: "number" },
  },
  required: ["firstName", "lastName", "password", "rePassword", "email"],
  additionalProperties: true,
};
module.exports = { loginSchema, signupSchema };
