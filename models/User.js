let db = [];

class User {
  constructor(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.passwordHash = "fdhfdhfg45646";
    this.gender = userData.gender;

    this.id = Date.now();

    return Promise.resolve(this); //асинхронный конструктор
  }

  static async create(userData) {
    const user = await new User(userData);
    db.push(user);
    return user;
  }

  static async findAll() {
    return db;
  }

  static async findById(id) {
    try {
      const foundUser = db.find((user) => user.id === Number(id));
      if (!foundUser) {
        throw new Error("User not found");
      } else {
        return foundUser;
      }
    } catch (error) {
      return error;
    }
  }

  static async deleteById(id) {
    db = db.filter((user) => user.id !== Number(id));
    return id;
  }

  async update(newValues) {
    const newUser = {
      ...this,
      ...newValues,
    };
    const userIndex = db.findIndex((user) => user.id === Number(this.id));
    db[userIndex] = newUser;
    return newUser;
  }
}

module.exports = User;
