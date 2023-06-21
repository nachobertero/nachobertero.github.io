const moneda1 = document.getElementById('primermoneda');
const moneda2 = document.getElementById('segundamoneda');
const cantidad1 = document.getElementById('primercantidad');
const cantidad2 = document.getElementById('segundacantidad');
const cambio = document.getElementById('cambio');
const taza = document.getElementById('btn');


function cotizar(){
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