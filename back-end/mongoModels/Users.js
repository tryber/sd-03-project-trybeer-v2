class Users {
  constructor() {
    this.users = [];
  }

  setUser(socketId, room, user) {
    this.users = [...this.users, { socketId, room, ...user }];
    // console.log('\u001b[32m', 'SET', user, this.users, '\u001b[0m');
  }

  findUser(query) {
    const [attribute, value] = Object.entries(query) || [];
    // console.log('\u001b[34m', 'GET', query, this.users, '\u001b[0m');
    return this.users.find((user) => user[attribute] === value);
  }

  removeUserBySocketId(socketId) {
    this.users = this.users.reduce((users, user) => {
      if (socketId === user.socketId) return users;
      return [...users, user];
    }, []);
    // console.log('\u001b[31m', 'DELETE', socketId, this.users, '\u001b[0m');
  }

  updateUser(socketId, info) {
    let user = this.findUser({ socketId });
    if (!user) return null;
    user = { ...user, ...info };
    return user;
  }
}

module.exports = Users;
