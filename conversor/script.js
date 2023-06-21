const primerMoneda = document.getElementById('primermoneda');
const segundaMoneda = document.getElementById('segundamoneda');
const primerCantidad = document.getElementById('primercantidad');
const segundaCantidad = document.getElementById('segundacantidad');
const cambio = document.getElementById('cambio');
const taza = document.getElementById('taza');

// Fetch Exchange Rate and Update the DOM
function calcular() {
  const moneda1 = primerMoneda.value;
  const moneda2 = segundaMoneda.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${moneda1}`)
    .then(res => res.json())
    .then(data => {
      const tasa = data.rates[moneda2];

      cambio.innerText = `1 ${moneda1} = ${tasa} ${moneda2}`;

      segundaCantidad.value = (primerCantidad.value * taza).toFixed(2);

    });
}

// Event listeners
primerMoneda.addEventListener("change", calcular);
primerCantidad.addEventListener("input", calcular);

segundaMoneda.addEventListener("change", calcular);
segundaCantidad.addEventListener("input", calcular);

taza.addEventListener("click", () => {
  const temporal = primerMoneda.value;
  primerMoneda.value = segundaMoneda.value;
  segundaMoneda.value = temporal;
  calcular();
});

calcular();
