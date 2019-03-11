let DB_URI = `postgresql://`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/ada-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/ada`;
}

module.exports = DB_URI;
