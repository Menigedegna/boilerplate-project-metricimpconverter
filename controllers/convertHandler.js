function ConvertHandler() {
  
  this.getNum = function(input) {
    //extract the digits at the begining of the string
    let result = "invalid number";
    let num = input.match(/(^[0-9/.]+)/g);
    // if number is provided
    if (num){
      num = num[0];
      //if fraction and only one fraction
      let fractionOccurs =  num.match(/[/]/g);
      if (!fractionOccurs || (fractionOccurs!=undefined && fractionOccurs.length<2)){
        try{
          result = eval(num);
        }
        catch{
          result = "invalid number";
        }      
      } 
    }
    //if number is not provided
    else{
      result = 1;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let unitDic = {gal: "gal", l: "L", mi: "mi", km: "km", lbs: "lbs", kg: "kg"};
    let result = "invalid unit";
    //extract what comes after the digits
    let unit = input.match(/([a-z]+)/gi);  
    //if unit is found
    if(unit 
       && unit != undefined 
       && unit.length>0 
       && Object.keys(unitDic).indexOf(unit[0].toLowerCase())>-1
      ){
      result = unitDic[unit[0].toLowerCase()];
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = undefined;
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let dictUnits = {gal: "gallons", l: "liters", mi: "miles", km: "kilometers", lbs: "pounds", kg: "kilograms"};
    let result = 'invalid unit'
    result = dictUnits[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
        switch (initUnit.toLowerCase()) {
      case "gal":
        result = +(initNum * galToL).toFixed(5);
        break;
      case "l":
        result = +(initNum / galToL).toFixed(5);
        break;
      case "lbs":
        result = +(initNum * lbsToKg).toFixed(5);
        break
      case "kg":
        result = +(initNum / lbsToKg).toFixed(5);
        break;
      case "mi":
        result = +(initNum * miToKm).toFixed(5);
        break;
      case "km":
        result = +(initNum / miToKm).toFixed(5);
        break;
      default:
        result = undefined;
        break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitSpelledOut = this.spellOutUnit(initUnit.toLowerCase());
    let returntUnitSpelledOut = this.spellOutUnit(returnUnit.toLowerCase());    
    let result = `${initNum} ${initUnitSpelledOut} converts to ${returnNum} ${returntUnitSpelledOut}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
