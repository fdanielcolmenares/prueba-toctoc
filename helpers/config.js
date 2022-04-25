require('dotenv').config();

const PORT = process.env.PORT;
const MIN_DISCONNECT = process.env.MIN_DISCONNECT;
const DBUSER = process.env.DBUSER;
const DBPASS = process.env.DBPASS;

module.exports = {
  MIN_DISCONNECT,
  PORT,
  DBUSER,
  DBPASS
}