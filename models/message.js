const db = require("../db");

class Message {
  static async getAll() {
    const result = await db.query(
      `SELECT m1.conversation_id,
        JSON_AGG(JSON_BUILD_OBJECT('sender', m2.sender, 'message', m2.message, 'created_at', m2.created_at)) as messages
        FROM messages m1
        JOIN messages m2
          ON m1.conversation_id = m2.conversation_id
          AND m1.sender = m2.sender
          AND m1.message = m2.message
        GROUP BY 1`
    );
    return result.rows;
  }

  static async getOne(data) {
    const result = await db.query(
      `SELECT m1.conversation_id,
        JSON_AGG(JSON_BUILD_OBJECT('sender', m2.sender, 'message', m2.message, 'created_at', m2.created_at)) as messages
        FROM messages m1
        JOIN messages m2
          ON m1.conversation_id = m2.conversation_id
          AND m1.sender = m2.sender
          AND m1.message = m2.message
        WHERE m1.conversation_id = $1
        GROUP BY 1`,
      [data]
    );
    if (result.rows.length === 0) {
      const error = new Error(`Conversation ${data} does not exist`);
      error.status = 404;
      throw error;
    }
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO messages
        (conversation_id, sender, message, created_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
        RETURNING conversation_id, sender, message, created_at`,
      [data.conversation_id, data.sender, data.message]
    );
    return result.rows[0];
  }
}

module.exports = Message;
