const supabase = require("../config/supabaseClient.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

exports.signup = async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }])
    .select();

  if (error) return res.status(400).json(error);

  res.json({
    message: "Signup successful",
    token: generateToken(data[0])
  });

};

exports.login = async (req, res) => {

  const { email, password } = req.body;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!data)
    return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, data.password);

  if (!valid)
    return res.status(401).json({ message: "Wrong password" });

  res.json({
    token: generateToken(data)
  });

};