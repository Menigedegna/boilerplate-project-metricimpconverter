'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
    
  //handle home page
  app.route('/').get( (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
  });
  
  //handle get convert
  app.route('/api/convert').get(processConversion, (req, res) => {
    res.send(req.result);
  });
};

// middleware to processConversion
function processConversion(req, res, next){
  let convertHandler = new ConvertHandler();
  let output = undefined;
  let input = req.query.input;
  
  //get number and unit from input
  let initNum = convertHandler.getNum(input);
  let initUnit = convertHandler.getUnit(input);

  // if number and unit are correct
  if(initNum != 'invalid number' && initUnit != 'invalid unit'){
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let outputString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    output = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: outputString
    };
  }else if(initNum == 'invalid number' && initUnit != 'invalid unit'){ output = initNum; }
  else if(initUnit == 'invalid unit' && initNum != 'invalid number'){ output = initUnit; } 
  else{ output = 'invalid number and unit'; }
  req.result = output;
  next();
}
