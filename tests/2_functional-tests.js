const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = process.env.SERVER;
  
chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  // Convert a valid input such as 10L: GET request to /api/convert.
  test('Test GET /api/convert with a valid, eg. input=10L', function(done) {
    let output = {
      initNum: 10,
      initUnit: "L",
      returnNum: 2.64172,
      returnUnit: "gal",
      string: "10 liters converts to 2.64172 gallons"
    }
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, output);
        done();
      });
  });
  
  // Convert an invalid input such as 32g: GET request to /api/convert.
  test('Test GET /api/convert with an invalid input, eg. input=32g', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.deepEqual(res.text, 'invalid unit');
        done();
      });
  });
  
  // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  test('Test GET /api/convert with an invalid input, eg. input=3/7.2/4kg', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.deepEqual(res.text, 'invalid number');
        done();
      });
  });
  
  // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  test('Test GET /api/convert with an invalid input, eg. input=3/7.2/4kilomegagram', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.deepEqual(res.text, 'invalid number and unit');
        done();
      });
  });
  
  // Convert with no number such as kg: GET request to /api/convert.
  test('Test GET /api/convert with no number, eg. input=kg', function(done) {
    let output = {
      initNum: 1,
      initUnit: "kg",
      returnNum: 2.20462,
      returnUnit: "lbs",
      string: "1 kilograms converts to 2.20462 pounds"
    }
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.deepEqual(res.body, output);
        done();
      });
  });
});
