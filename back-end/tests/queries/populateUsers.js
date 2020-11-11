const populateUsers = `
INSERT INTO users (id, name, email, password, role) VALUES
    ('1', 'Tryber Admin', 'tryber@trybe.com.br', '123456', 'administrator'),
    ('2', 'testuser', 'user@test.com', 'test123', 'client');
`;

module.exports = populateUsers;
