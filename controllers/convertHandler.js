function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = "invalid number";
    // extract numbers from input
    let num = input.match(/([0-9/.]+)/g);
    
    // if number is provided
    if ( num ){
      // if there is only one index for number & number comes before unit
      if ( num.length==1 && input.indexOf(num[0])==0 ){
        num = num[0];
        //if fractions and decimal only occur once
        let fractionOccurs =  num.match(/[/]/g);
        let decimalOccurs =  num.match(/[.]/g);
        if(
          (!fractionOccurs || (fractionOccurs && fractionOccurs.length<2)) 
          && (!decimalOccurs || (decimalOccurs && decimalOccurs.length<2))
           ){
          try{
            let evalNumber = eval(num);
            if( Number.isFinite(evalNumber) && evalNumber>0 ){
              result = evalNumber;
            }
          }
          catch{
            result = "invalid number";
          }  
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
    
    //extract characters in input
    let unit = input.match(/([a-z]+)/gi); 
    
    //get index of first digit and firt character
    let firstDigitIndex = input.search(/([0-9])/);
    let firstCharIndex = input.search(/[a-z]/i);
    
    //if unit is found & unit comes after numeric value 
    if(firstCharIndex > -1 && firstDigitIndex < firstCharIndex){
      // if unit is recognized
      if( Object.keys(unitDic).indexOf(unit[0].toLowerCase())>-1 ){
        result = unitDic[unit[0].toLowerCase()];
      }
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
