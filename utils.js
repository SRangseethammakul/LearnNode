/*
exports.calculatVat = function calculatVat(money, vat){
    return money * vat / 100;
}
exports.sayHello = function sayHello(){
    console.log('Hello');
}
*/
function calculateVat(money, vat){
    return money * vat / 100;
}
function sayHello(){
    console.log('Hello');
}

module.exports = {
    calculateVat,
    sayHello
}