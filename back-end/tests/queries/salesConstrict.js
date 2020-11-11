const salesConstrict = `
CREATE TABLE IF NOT EXISTS sales (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_price DECIMAL(9,2) NOT NULL,
delivery_address VARCHAR(100) NOT NULL,
delivery_number VARCHAR(50) NOT NULL,
sale_date DATETIME NOT NULL,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);`;

module.exports = salesConstrict;
