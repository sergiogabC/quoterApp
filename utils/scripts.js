//Verifica si un valor, del total de valores pasados es cero
export function verified(...values) {
  for (let val of values) {
    if (val === 0) {
      return true;
    }
  }
  return false;
}

//Itera un string y lo separa cada que existe un + y lo convierte en array
export function iterManu(input) {
  let manu = "";
  let manus = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "+" || input[i] === "") {
      manus.push(manu);
      manu = "";
    } else {
      manu = manu + input[i];
    }
  }

  manus.push(manu);
  if (manus.length === 1) {
    return input;
  }
  return manus;
}
