const db = require("../db");

class Message {
  static async create(data) {
    const result = await db.query(
      `INSERT INTO messages
        (conversation_id, sender, message, created_at)
        VALUES ($1, $2, $3, $4)
        RETURNING conversation_id, sender, message, created_at`,
      [data.conversation_id, data.sender, data.message, data.created_at]
    );
    return result.rows[0];
  }
}

module.exports = Message;
