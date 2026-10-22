const { v4: uuidv4 } = require('uuid');

class User {
  constructor({ email, password, name }) {
    this.id = uuidv4();
    this.email = email;
    this.password = password; // hashed
    this.name = name;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = User;
