\c

CREATE TABLE messages
(
  conversation_id INTEGER NOT NULL,
  sender VARCHAR(50),
  message VARCHAR(2000),
  created_at TIMESTAMP
)