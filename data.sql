\c

CREATE TABLE messages
(
  conversation_id INTEGER NOT NULL PRIMARY KEY,
  sender VARCHAR(50),
  message VARCHAR(2000),
  created_at DATE
)