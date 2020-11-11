const salesProductsConstrict = `
CREATE TABLE IF NOT EXISTS sales_products (
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity VARCHAR(10) NOT NULL,
  PRIMARY KEY(sale_id, product_id),
  FOREIGN KEY(sale_id) REFERENCES sales(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);`;

module.exports = salesProductsConstrict;
