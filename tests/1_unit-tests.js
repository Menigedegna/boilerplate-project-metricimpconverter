const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();


suite('Unit Tests', function(){
  suite('unit', function () {
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const convertUnit = {gal: "L", l: "gal", mi: "km", km: "mi", lbs: "kg", kg: "lbs"}
    const spellOutUnits = {gal: "gallons", l: "liters", mi: "miles", km: "kilometers", lbs: "pounds", kg: "kilograms"}
    // #1
    test('Should correctly return an error for an invalid input unit', function () {
      assert.equal(convertHandler.getUnit("3min"), 'invalid unit', 'getUnit("3min") should return "invalid unit"');
      assert.equal(convertHandler.getUnit("3"), 'invalid unit', 'getUnit("3min") should return "invalid unit"');
    });
    // #2    
    test('Should correctly read each valid input unit.', function () {
      for (let idx in validUnits){
        let unit = validUnits[idx];
        assert.equal(convertHandler.getUnit("1.5" + unit), unit, `getUnit("1.5${unit}") should return ${unit}`);
        assert.equal(convertHandler.getUnit("1.5" + unit.toUpperCase()), unit, `getUnit("1.5${unit}") should return ${unit}`);
      }
    });
   // #3   
    test('Should return the correct return unit for each valid input unit', function () {
      for (let idx in validUnits){
        let unit = validUnits[idx].toLowerCase();
          assert.equal(convertHandler.getReturnUnit(unit), convertUnit[unit], `getReturnUnit("1.5${unit}") should return ${convertUnit[unit]}`);
      }
    });
    // #4
    test('Should correctly correctly return the spelled-out string unit for each valid input unit', function () {
      for (let idx in validUnits) {
        let unit = validUnits[idx].toLowerCase();
        assert.equal(convertHandler.spellOutUnit(unit), spellOutUnits[unit], `spellOutUnit("${unit}") should return ${spellOutUnits[unit]}`);
      }
    });  
    
  });//end suite unit
  
  
  suite('numerical', function () {
    // #5
    test('Should correctly read a whole number input', function () {
      assert.equal(convertHandler.getNum("15mi"), 15, 'getNum("15mi") should return 15');
    });
    // #6
    test('Should correctly read a decimal number input', function () {
      assert.equal(convertHandler.getNum("1.5mi"), 1.5, 'getNum("1.5mi") should return 1.5');
    });
    // #7
    test('Should correctly read a fractional input.', function () {
      assert.equal(convertHandler.getNum("3/2mi"), 1.5, 'getNum("3/2mi") should return 1.5');
    });
    // #8
    test('Should correctly read a fractional input with a decimal', function () {
      assert.equal(convertHandler.getNum("3.0/2mi"), 1.5, 'getNum("3.0/2mi") should return 1.5');
    });
    // #9
    test('Should correctly return an error on a double-fraction', function () {
      assert.equal(convertHandler.getNum("3/2/3mi"), 'invalid number', 'getNum("3/2/3mi") should return "invalid number"');
    });
    // #10
    test('Should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
      assert.equal(convertHandler.getNum("mi"), 1, 'getNum("mi") should return 1');
    }); 
    
  });//end suite numerical
  
  
  suite('convert', function () {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    // #11
    test('Should correctly convert gal to L.', function () {
      assert.equal(convertHandler.convert(1, "gal"), galToL.toFixed(5), `convert(1, "gal") should return ${galToL.toFixed(5)}`);
    }); 
    // #12
    test('Should correctly convert L to gal.', function () {
      assert.equal(convertHandler.convert(1, "L"), (1/galToL).toFixed(5), `convert(1, "L") should return ${1/galToL.toFixed(5)}`);
    });  
    // #13
    test('Should correctly convert mi to km.', function () {
      assert.equal(convertHandler.convert(1, "mi"), miToKm.toFixed(5), `convert(1, "mi") should return ${miToKm.toFixed(5)}`);
    }); 
    // #14
    test('Should correctly convert km to mi.', function () {
      assert.equal(convertHandler.convert(1, "km"), (1/miToKm).toFixed(5), `convert(1, "mi") should return ${(1/miToKm).toFixed(5)}`);
    }); 
    // #15
    test('Should correctly convert lbs to kg.', function () {
      assert.equal(convertHandler.convert(1, "lbs"), lbsToKg.toFixed(5), `convert(1, "lbs") should return ${lbsToKg.toFixed(5)}`);
    }); 
    // #16
    test('Should correctly convert kg to lbs.', function () {
      assert.equal(convertHandler.convert(1, "kg"), (1/lbsToKg).toFixed(5), `convert(1, "mi") should return ${(1/lbsToKg).toFixed(5)}`);
    }); 
    
  });//end suite convert
});
