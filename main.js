
let menu = document.querySelector("#menuicono");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

// SAQUÉ LO QUE TENIA DE JAVASCRIPT EN HTML Y LO PUSE ACÁ
const botonVehiculo = document.getElementById("botonVehiculo");
const formulario2 = document.getElementById("formulario2");
const boton = document.getElementById("boton");


botonVehiculo.addEventListener("click", mostrar2doformulario);
boton.addEventListener("click", ocultar2doformulario);

// Funciones para mostrar y ocultar el segundo formulario
function mostrar2doformulario() {
    formulario2.style.display = "block";
}

function ocultar2doformulario() {
    formulario2.style.display = "none";
}


// OBTENGO LA REFERENCIA DEL FORMULARIO
const form = document.getElementById("form");
const btnCalcular = document.getElementById("calculo1");
btnCalcular.addEventListener("click", calcularTotal); 

// AGREGO UN EVENTO SUBMIT
form.addEventListener("submit", calcularTotal);

// QUE HAGO CUANDO ENVIO EL FORMULARIO ? 
function calcularTotal(event) {

  event.preventDefault(); //PARA QUE LA PAGINA NO SE RECARGUE

  document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    // EL FORMULARIO VEHICULO SE ENCUENTRA OCULTO INICIALMENTE, SE MUESTRA CUANDO SE DA CLICK EN QUIERO ENTREGAR UN VEHICULO
    document.getElementById('segundoFormulario').style.display = 'block';
  });

  // OBTENGO LAS REFERENCIAS DE LO INGRESADO EN LOS FORMULARIOS
  const cantidadCuotas = parseInt(document.getElementById("cantidadCuotas").value);
  const valorVehiculo = parseFloat(document.getElementById("valorVehiculo").value);
  const tna = parseFloat(document.getElementById("tna").value / 12 / 100).toFixed(2);
  const patenteAnual = parseFloat(document.getElementById("patenteAnual").value) / 12;

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const año = parseInt(document.getElementById("año").value);
  const kilometraje = parseInt(document.getElementById("kilometraje").value);

  entrega = estimarValor(año);

  // CALCULO DE LA CUOTA INICIAL
  const cuotaInicial = (valorVehiculo - entrega) / cantidadCuotas;

  let mes = 0;
  let cuotaMensual = cuotaInicial;

  let numeroDeCuota = []; // ARRAY NUMERO DE CUOTA
  let montoDeCuota = []; // ARRAY MONTO

  const aumentoValorAuto = 0.40 / 12;

  // Ciclo: Opté por un while

  while (mes <= cantidadCuotas) {
    numeroDeCuota.push(`${mes}:`);
    montoDeCuota.push(`$ ${cuotaMensual.toFixed(0)}`);
    cuotaMensual += cuotaInicial * tna + cuotaInicial * aumentoValorAuto;
    mes++;
  } // ASI LA CUOTA VA AUMENTANDO Y SE COLOCA EL VALOR CORRESPONDIENTE

  // OBTENGO LA REFERENCIA DE LA TABLA PARA PODER CREARLE LA LISTA DE CUOTAS CON LOS MONTOS Y EL VALOR DE LA PATENTE
  const listaCuotas = document.getElementById("tabla");
  listaCuotas.classList.add("tabla-con-fade"); 
  let añoCompleto = 0;

  for (let i = 0; i < numeroDeCuota.length; i++) {
    const nuevaFila = document.createElement("tr");

    const numeroCuota = document.createElement("td");
    numeroCuota.innerText = numeroDeCuota[i];
    nuevaFila.appendChild(numeroCuota);

    const montoCuota = document.createElement("td");
    montoCuota.innerText = montoDeCuota[i];
    nuevaFila.appendChild(montoCuota);

    // SI EL NUMERO DE CUOTA ES MULTIPLO DE 12, APARECE EL VALOR PATENTE ACTUALIZADO
    if (parseInt(numeroDeCuota[i]) % 12 === 0) {
      añoCompleto++;
    }

    const patenteAnualActualizada = patenteAnual * Math.pow(1.25, añoCompleto);

    const patente = document.createElement("td");
    patente.innerText = (parseInt(numeroDeCuota[i]) % 12 === 0) ? ` $ ${patenteAnualActualizada.toFixed(2)}` : "-";
    nuevaFila.appendChild(patente);

    listaCuotas.appendChild(nuevaFila);
  }

  // SESSION STORAGE: GUARDO LOS DATOS QUE EL USUARIO INGRESÓ EN EL PRIMER FORMULARIO
  const guardarFormulario = {
    cantidadCuotas: cantidadCuotas,
    valorVehiculo: valorVehiculo,
    tna: tna * 12 * 100,
    patenteAnual: patenteAnual * 12 ,
  };

  const guardarFormularioJSON = JSON.stringify(guardarFormulario);
  sessionStorage.setItem('formularioData', guardarFormularioJSON);
}


const formulario = document.getElementById("form");

let tabla = document.getElementById("tabla");
let encabezado = document.getElementById("encabezado");

if (tabla.rows.length > 1) {
  encabezado.style.display = "table-header-group";
}

function estimarValor(año) {
  let entrega = 0;

  if (año >= 2015 && año <= 2023) {
    entrega = 6000000;
    const mensaje = document.getElementById("valorEntrega");
    Swal.fire({ //USO DE LA LIBRERIA SWEETALERT2
  title: 'Gracias por cargar tu vehículo!',
  text: `Siendo del año ${año}. Podríamos tomarlo  en aproximadamente 6 millones de pesos.`,
  imageUrl: 'https://grasautomotores.com.ar/wp-content/uploads/thememakers/cardealer/12/3990/main/6480e21aa2fe6.jpg',
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: 'Custom image',
})


  } else if (año >= 2000 && año < 2015) {
    entrega = 2000000;
    const mensaje = document.getElementById("valorEntrega");
    Swal.fire({
      title: 'Gracias por cargar tu vehículo!',
      text: `Siendo del año ${año}. Podríamos tomarlo  en aproximadamente 2 millones de pesos.`,
      imageUrl: 'https://www.carsmagazine.com.ar/wp-content/uploads/2011/01/autos-usados.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
    

  } else if (año < 2000) {
    entrega = 0;
    const mensaje = document.getElementById("valorEntrega");
    Swal.fire({
      title: 'Gracias por cargar tu vehículo!',
      text: `No estamos tomando los que sean menores al año 2000.`,
      imageUrl: 'https://autotest.com.ar/wp-content/uploads/2022/05/Renault-12-frente.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
    
  }

  return entrega;
}


// RECUPERO LOS VALORES DEL SESSION STORAGE CON UN EVENTO LOAD
window.addEventListener("load", function() {
  const dataFormularioJSON = sessionStorage.getItem('formularioData');
  if (dataFormularioJSON) {
    const recuperarFormulario = JSON.parse(dataFormularioJSON);
    document.getElementById("cantidadCuotas").value = recuperarFormulario.cantidadCuotas;
    document.getElementById("valorVehiculo").value = recuperarFormulario.valorVehiculo;
    document.getElementById("tna").value = recuperarFormulario.tna;
    document.getElementById("patenteAnual").value = recuperarFormulario.patenteAnual;
  }
});

////////////////////////////////////////////////SECCION CONVERSOR//////////////////////////////////////////////////////////////////


const moneda1 = document.getElementById('primermoneda');
const moneda2 = document.getElementById('segundamoneda');
const cantidad1 = document.getElementById('primercantidad');
const cantidad2 = document.getElementById('segundacantidad');
const cambio = document.getElementById('cambio');
const taza = document.getElementById('taza');


function cotizar(){ //USO DE FETCH + API QUE MANTIENE LAS DIVISAS CON EL VALOR ACTUAL
    const monedaUno = moneda1.value;
    const monedaDos = moneda2.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${monedaUno}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[monedaDos];
       
       cambio.innerText = `1 ${monedaUno} = ${taza} ${monedaDos}`;

       cantidad2.value = (cantidad1.value * taza).toFixed(2);

    } );
    
}


moneda1.addEventListener('change', cotizar);
cantidad1.addEventListener('input', cotizar);

moneda2.addEventListener('change', cotizar);
cantidad2.addEventListener('input', cotizar);

taza.addEventListener('click', () =>{
    const temporal = moneda1.value;
    moneda1.value = moneda2.value;
    moneda2.value = temporal;
    cotizar();
} );


cotizar();

////////////////////////////////////////////////SECCION CONVERSOR//////////////////////////////////////////////////////////////////