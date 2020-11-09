const productsConstrict = `
CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(4,2) NOT NULL,
  url_image VARCHAR(200) NOT NULL DEFAULT '',
  PRIMARY KEY(id),
  UNIQUE KEY \`name\` (name)
);`;

module.exports = productsConstrict;
