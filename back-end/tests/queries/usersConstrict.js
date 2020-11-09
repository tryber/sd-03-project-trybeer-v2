const usersConstrict = `
CREATE TABLE IF NOT EXISTS users (
id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) NOT NULL,
   password VARCHAR(20) NOT NULL,
   role VARCHAR(20) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE KEY \`email_un\` (email)
);`;

module.exports = usersConstrict;
