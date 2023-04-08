const Message = require('../../models/message.model');

const getMessages = async(req, res) => {
  const miId = req.uid;
  const messageFrom = req.params.from;

  const last30 = await Message.find({
    $or: [{ from: miId, to: messageFrom }, { from: messageFrom, to: miId }],
  })
    .sort({ createdAt: 'desc' })
    .limit(30);

  res.json({
    ok: true,
    messages: last30,
  });
}

module.exports = {
  getMessages
}
