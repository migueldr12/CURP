"use strict";
const estados = [
  "AS",
  "BC",
  "BS",
  "CC",
  "CL",
  "CM",
  "CS",
  "CH",
  "DF",
  "DG",
  "GT",
  "GR",
  "HG",
  "JC",
  "MC",
  "MN",
  "MS",
  "NT",
  "NL",
  "OC",
  "PL",
  "QT",
  "QR",
  "SP",
  "SL",
  "SR",
  "TC",
  "TS",
  "TL",
  "VZ",
  "YN",
  "ZS",
  "NE",
];

document.getElementById("btnCurp").addEventListener("click", (e) => {
  e.preventDefault;
  const curp = document.getElementById("txtCURP").value;
  if (curp !== "") {
    validarCurp(curp);
  } else {
    Swal.fire("Error", "Campo de curp vacio", "error");
  }
});
document.getElementById("btnRFC").addEventListener("click", (e) => {
  e.preventDefault;
  const curp = document.getElementById("txtCURP").value;
  const rfc = document.getElementById("txtRFC").value;
  if (curp !== "") {
    if (rfc !== "") {
      validarRFC(curp, rfc);
    } else {
      Swal.fire("Error", "Campo de rfc vacio", "error");
    }
  } else {
    Swal.fire("Error", "Campo de curp vacio", "error");
  }
});
// DURM001212HGTRMGA5

function validarCurp(curp) {
  // Verificamos si son 18 caracteres
  if (curp.length < 18) {
    Swal.fire("Error", "El CURP tiene menos de 18 letras", "error");
    return;
  } else if (curp.length > 18) {
    Swal.fire("Error", "El CURP tiene mas de 18 letras", "error");
    return;
  }

  // Verificamos identificador de sexo (caracter 11, que en base 0 es 10)
  if (!(curp[10] !== "H" || curp[10] !== "M")) {
    Swal.fire("Error", "Identificador de sexo incorrecto", "error");
    return;
  }

  //Verificamos identificador de estado usando el array de
  const estado = curp.substring(11, 13);
  if (!estados.find((element) => element === estado)) {
    Swal.fire("Error", "Identificador de estado incorrecto", "error");
    return;
  }

  //Verificamos identificador de fecha de nacimiento
  const anio = +curp.substring(4, 6);
  const mes = +curp.substring(6, 8);
  const dia = +curp.substring(8, 10);
  // Verificamos los meses
  if (mes > 12) {
    Swal.fire("Error", "Identificador de mes incorrecto", "error");
    return;
  }
  // Validamos primero si es año bisiesto
  if (anio % 4 === 0) {
    if (mes === 2) {
      if (dia > 29) {
        Swal.fire("Error", "Identificador de dia incorrecto", "error");
        return;
      }
    }
  }
  // Ya si no es bisiesto verificamos los dias
  if (mes % 2 === 0 && mes !== 2 && dia > 30) {
    Swal.fire("Error", "Identificador de dia incorrecto", "error");
    return;
  } else if (mes % 2 !== 0 && mes !== 2 && dia > 31) {
    Swal.fire("Error", "Identificador de dia incorrecto", "error");
    return;
  } else if (mes === 2 && dia > 28) {
    Swal.fire("Error", "Identificador de dia incorrecto", "error");
    return;
  }

  // Verificar que los primeros digitos son letras
  const primerosDigitos = curp.substring(0, 4);
  for (const char of primerosDigitos) {
    if (!isNaN(char)) {
      Swal.fire(
        "Error",
        `Los primeros 4 digitos son incorrecto. ${char} no es una letra.`,
        "error"
      );
      return;
    }
  }

  Swal.fire(
    "Bien",
    `CURP Validado correctamente. Tu edad es ${calcularEdad(
      anio,
      mes,
      dia
    )} años`,
    "success"
  );
}
function validarRFC(curp, rfc) {
  curp10 = curp.substring(0, 10);
  rfc10 = rfc.substring(0, 10);
  const anio = +curp.substring(4, 6);
  const mes = +curp.substring(6, 8);
  const dia = +curp.substring(8, 10);

  if (rfc.length < 13) {
    Swal.fire("Error", "El rfc tiene menos de 13 letras", "error");
    return;
  } else if (rfc.length > 13) {
    Swal.fire("Error", "El rfc tiene mas de 13 letras", "error");
    return;
  }
  if (curp10 !== rfc10) {
    Swal.fire("Error", "CURP y RFC no son iguales", "error");
    return;
  }
  Swal.fire(
    "Bien",
    `RFC Validado correctamente. Tu edad es ${calcularEdad(
      anio,
      mes,
      dia
    )} años`,
    "success"
  );
}

function calcularEdad(anio, mes, dia) {
  anio = anio > 24 ? anio + 1900 : anio + 2000;

  const now = new Date();
  const fechaNacimiento = new Date(anio, mes - 1, dia);
  let edad = now.getFullYear() - fechaNacimiento.getFullYear();

  const cumpleEsteAno =
    now.getMonth() > mes - 1 ||
    (now.getMonth() === mes - 1 && now.getDate() >= dia);

  if (!cumpleEsteAno) {
    edad--;
  }

  return edad;
}
