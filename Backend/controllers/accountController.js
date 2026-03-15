const supabase = require("../config/supabaseClient");

exports.getBalance = async (req, res) => {

  const userId = req.user.id;

  const { data } = await supabase
    .from("users")
    .select("balance")
    .eq("id", userId)
    .single();

  res.json(data);

};

exports.getStatement = async (req, res) => {

  const userId = req.user.id;

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

  res.json(data);

};

exports.transfer = async (req, res) => {

  const senderId = req.user.id;
  const { receiverEmail, amount } = req.body;

  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("email", receiverEmail)
    .single();

  if (!receiver)
    return res.status(404).json({ message: "Receiver not found" });

  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", senderId)
    .single();

  if (sender.balance < amount)
    return res.status(400).json({ message: "Insufficient balance" });

  await supabase
    .from("users")
    .update({ balance: sender.balance - amount })
    .eq("id", senderId);

  await supabase
    .from("users")
    .update({ balance: receiver.balance + amount })
    .eq("id", receiver.id);

  await supabase.from("transactions").insert([
    {
      sender_id: senderId,
      receiver_id: receiver.id,
      amount,
      transaction_type: "debit"
    },
    {
      sender_id: senderId,
      receiver_id: receiver.id,
      amount,
      transaction_type: "credit"
    }
  ]);

  res.json({ message: "Transfer successful" });

};