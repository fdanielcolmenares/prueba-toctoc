/*
* Ordenar números ascendente y descendente
* numbers cadena o array a ordenar
* Type = 'ASC' ordena ascendete, Type = 'DESC' ordena descendete
*/
const orderNumberBy = (numbers, type) => {
  let sort = '';

  if(typeof numbers === 'string' || numbers instanceof String){
    sort = numbers.replace(new RegExp(/[ ]/g, 'g'), '');
    sort = sort.split(',');
  }
  
  if(Array.isArray(numbers)){
    sort = numbers;
  }

  if(sort !== ''){
    if(type == 'ASC'){
      sort = sort.sort((a, b)=>{
        return a - b;
      });
    }

    if(type == 'DESC'){
      sort = sort.sort((a, b)=>{
        return b - a;
      });
    }

    return sort.toString();
  }

  return false;
}

/*
* Encontrar un número
* array coleccion en la que se va a buscar el número
* number número a buscar
* retorna false si no consigue el número y la posición del número si lo consigue
*/
const searchNumber = (array, number, pos = 0) => {
  if(array.length == 0 || pos > array.length - 1){
    return false;
  }

  if(array[pos] == number){
    return pos;
  }

  return searchNumber(array, number, pos + 1);
}