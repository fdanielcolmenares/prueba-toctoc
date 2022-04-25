/*
* Retorna número redondeado a dos decimales
*/
const roundToTwoDec = (num) => {
  return +(Math.round(num + "e+2")  + "e-2");
}

/*
* Retorna cantidad en Megas
*/
const toMB = (cant) => {
  return (cant/1024/1024);
}

module.exports = {
  roundToTwoDec,
  toMB
}