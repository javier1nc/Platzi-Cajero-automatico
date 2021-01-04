// script.js
var resultado = document.getElementById("resultado");
var b = document.getElementById("retirar");
b.addEventListener("click", entregarDinero);

var imagenes = [];
imagenes["20"] = "images/20pesos.jpg";
imagenes["50"] = "images/50pesos.jpg";
imagenes["100"] = "images/100pesos.png";
imagenes["200"] = "images/200pesos.png";
imagenes["500"] = "images/500pesos.png";
imagenes["1000"] = "images/1000pesos.png";

class Billete {
  constructor(value, quantity) {
    this.valor = value;
    this.cantidad = quantity;
    this.imagen = new Image();
    this.imagen.src = imagenes[this.valor];
  }
  mostrar() {
    //console.log(this.imagen);
    //document.body.appendChild(this.imagen);
    for (var i = 0; i < this.cantidad;i++) {
      resultado.innerHTML += "<img src=" + this.imagen.src + ">" + "</img> &nbsp";
    }
    resultado.innerHTML += "<br>";
  }
}

var cartera_dinero = [];
// Billetes en caja
var caja_dinero = [];
caja_dinero.push(new Billete("1000", 4));
caja_dinero.push(new Billete("500", 5));
caja_dinero.push(new Billete("200", 6));
caja_dinero.push(new Billete("100", 7));
caja_dinero.push(new Billete("50", 8));
caja_dinero.push(new Billete("20", 9));




function entregarDinero() {
  /* Lee caja de texto */
  var t = document.getElementById("dinero");
  var dinero = parseInt(t.value);
  console.log("> Dinero a retirar: $" + dinero + ".");

  /* Total de dinero en la caja */
  var total = dineroEnCaja(caja_dinero);
  
  console.log("> Dinero disponible en caja: $" + total + "."); // Imprime total

  /* Comprueba si hay dinero sifiente en la caja */
  if (dinero <= total) {
    console.log("> Si hay dinero suficiente para realizar el retiro")
    retirar(dinero); // Si hay dinero suficiente se procede con el retiro
  } else {
    console.log("> No hay dinero suficiente para realizar el retiro")
    resultado.innerHTML = "Esta caja no cuenta con dinero suficiente";
    //<--- poner control 
  }

  function retirar(dinero_a_entregar) {
    /* Iteracion valor del billete en caja mayor a menor denominacion */
    if (dinero_a_entregar < 0) {
      console.log("> Solo se pueden retirar cantidades positivas.");
    } else if (dinero_a_entregar == 0) {
      console.log("> Solo se pueden retirar cantidades mayores que cero.");
    } else if (dinero_a_entregar > 0) {
      console.log("> Se ha ingresado una cantidad valida.");
      cantidadValida();
    }


    function cantidadValida() {

      /* Calculo por cada denominacion segun el orden de los billetes*/
      // for (var billete of caja_dinero) {
      for (var index in caja_dinero) {
        // var denominacion_billete = parseInt(billete.valor);
        var denominacion_billete = parseInt(caja_dinero[index].valor);
        // var cantidad_billete = parseInt(billete.cantidad);
        var cantidad_billete = parseInt(caja_dinero[index].cantidad);
        var numero_billetes_decimales = dinero_a_entregar / denominacion_billete;
        var numero_billetes_enteros = Math.floor(numero_billetes_decimales);
        var modulo_divicion_billetes = dinero_a_entregar % denominacion_billete;
        var numero_billetes_a_entregar;
        /* Cantidad de Billetes de la denominacion disponibles */

        dineroXentregar();

        function dineroXentregar() {
          if (cantidad_billete <= numero_billetes_enteros) {
            numero_billetes_a_entregar = cantidad_billete;
            console.log("> Se entregaran " + numero_billetes_a_entregar + " billetes de " + denominacion_billete + ".");
            /* Se modifica la cantidad de Billetes de la denominacion en caja */
            caja_dinero[index].cantidad = caja_dinero[index].cantidad - numero_billetes_a_entregar;
            console.log(">>caja_dinero: " + caja_dinero[index].cantidad); 
            cartera_dinero.push(new Billete(denominacion_billete.toString(), numero_billetes_a_entregar));
          } else {
            numero_billetes_a_entregar = numero_billetes_enteros;
            console.log("> Se entregaran " + numero_billetes_a_entregar + " billetes de " + denominacion_billete + ".");
            /* Se modifica la cantidad de Billetes de la denominacion en caja */
            caja_dinero[index].cantidad = caja_dinero[index].cantidad - numero_billetes_a_entregar;
            cartera_dinero.push(new Billete(denominacion_billete.toString(), numero_billetes_a_entregar));
          }
          dinero_a_entregar -= numero_billetes_a_entregar * denominacion_billete;
          console.log("> Dinero restante por entregar: $" + dinero_a_entregar + ".");

          console.log("> Quedan " + caja_dinero[index].cantidad + " billetes de $" +  caja_dinero[index].valor + " en la caja."); 
        }
      }
    }

    if (dinero_a_entregar == 0) {
      //console.log("Fin");

      var total = dineroEnCaja(caja_dinero); 

      resultado.innerHTML = "Dinero disponible en caja: <strong>$" + total +  ".</strong><br>";
      resultado.innerHTML += "Entregado:" + "<br>";

      console.log(cartera_dinero);
      console.log(caja_dinero);
      var total_billetes_cartera = 0;
      for (var billete of cartera_dinero) {
        //console.log(billete);
        resultado.innerHTML += billete.cantidad + " billetes de $ " + billete.valor + " = $" + billete.cantidad * billete.valor  + ".<br>";
        total_billetes_cartera += billete.cantidad * billete.valor ;

        if (billete.cantidad > 0) {
          billete.mostrar();
        }
      }
      resultado.innerHTML += "Total entregado: $" + total_billetes_cartera + ".";

    } else {
      resultado.innerHTML = "So lo se puede entregar multiplos de billetes de $: " + "50";
    }
    cartera_dinero = [];
  }
}

function dineroEnCaja(caja_dinero) {
  /* Total de dinero en la caja */
  var total = 0;
  for (var billete of caja_dinero) {
    var valor_billete = parseInt(billete.valor);
    var cantidad_billetes = parseInt(billete.cantidad);
    total += valor_billete * cantidad_billetes;
  }
  return total;
}