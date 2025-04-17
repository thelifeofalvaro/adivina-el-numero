let numeroSecreto;
let intentosRestantes;
let maxIntentos;
let minValor;
let maxValor;
let puntuaciones = [];

// Al cargar la página, se recuperan las puntuaciones guardadas
window.onload = function () {
  cargarPuntuaciones();
  actualizarTablaPuntuaciones();
};

function iniciarJuego() {
  minValor = parseInt(document.getElementById("min").value);
  maxValor = parseInt(document.getElementById("max").value);
  maxIntentos = parseInt(document.getElementById("intentos").value);
  intentosRestantes = maxIntentos;
  const iniciales = document.getElementById("iniciales").value.trim().toUpperCase();

  // Validación de datos: rango numérico, número de intentos y 3 letras para las iniciales
  if (
    isNaN(minValor) || isNaN(maxValor) || isNaN(maxIntentos) || minValor >= maxValor || maxIntentos <= 0 || !/^[A-Z]{3}$/.test(iniciales)
  ) {
    alert("Por favor, introduce valores válidos y asegúrate de que las iniciales sean 3 letras.");
    return;
  }

  numeroSecreto = Math.floor(Math.random() * (maxValor - minValor + 1)) + minValor;
  console.log("Número secreto: ", numeroSecreto);

  document.getElementById("setup").style.display = "none";
  document.getElementById("juego").style.display = "block";
  document.getElementById("intentosRestantes").innerText = `Intentos restantes: ${intentosRestantes}`;
}

function verificarIntento() {
  const entradaUsuario = parseInt(
    document.getElementById("entradaUsuario").value
  );
  const mensaje = document.getElementById("mensaje");

  // Limpiar clases anteriores
  mensaje.className = "mensaje";

  if (isNaN(entradaUsuario)) {
    alert("Introduce un número válido.");
    return;
  }

  // Validación del rango
  if (entradaUsuario < minValor || entradaUsuario > maxValor) {
    mensaje.innerText = `El número debe estar entre ${minValor} y ${maxValor}. Intentalo de nuevo.`;
    mensaje.classList.add("mensaje-error");
    return;
  }

  intentosRestantes--;

  if (entradaUsuario === numeroSecreto) {
    mensaje.innerText = "🎉 ¡Felicidades! Adivinaste el número. 🎉";
    mensaje.classList.add("mensaje-correcto");
    const intentosUsados = maxIntentos - intentosRestantes;
    guardarPuntuacion(intentosUsados, maxIntentos);
    terminarJuego();
  } else if (intentosRestantes === 0) {
    mensaje.innerText = `💀 Game Over. 💀 El número era ${numeroSecreto}.💀 `;
    mensaje.classList.add("mensaje-error");
    terminarJuego();
  } else {
    const pista =
      entradaUsuario < numeroSecreto
        ? "🔼 El número es mayor 🔼"
        : "🔽 El número es menor 🔽";
    mensaje.innerText = pista;
    mensaje.classList.add(
      entradaUsuario < numeroSecreto
        ? "mensaje-pista-bajo"
        : "mensaje-pista-alto"
    );
    document.getElementById(
      "intentosRestantes"
    ).innerText = `Intentos restantes: ${intentosRestantes}`;
  }

  document.getElementById("entradaUsuario").value = "";
}

function terminarJuego() {
  document.getElementById("juego").style.display = "none";
  document.getElementById("botonReinicio").style.display = "inline-block";
}

function reiniciarJuego() {
  document.getElementById("setup").style.display = "block";
  document.getElementById("juego").style.display = "none";
  document.getElementById("botonReinicio").style.display = "none";
  document.getElementById("mensaje").innerText = "";
  document.getElementById("entradaUsuario").value = "";
  document.getElementById("min").value = "";
  document.getElementById("max").value = "";
  document.getElementById("botonReinicio").value = "";
  // En principio se mantiene el valor de las iniciales por comodidad, ya que se entiende que los reinicios los hace el mismo jugador
  // Aunque también se podría limpiar con la siguiente línea:
  // document.getElementById("iniciales").value = "";
}

function guardarPuntuacion(intentosUsados, totalIntentos) {
  const eficiencia = ((intentosUsados / totalIntentos) * 100).toFixed(2);
  const iniciales = document
    .getElementById("iniciales")
    .value.trim()
    .toUpperCase();

  puntuaciones.push({ iniciales, intentosUsados, totalIntentos, eficiencia });
  // Ordenamos las puntuaciones por eficiencia (menor porcentaje es mejor)
  puntuaciones.sort((a, b) => a.eficiencia - b.eficiencia);
  localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));
  actualizarTablaPuntuaciones();
}

function cargarPuntuaciones() {
  const puntuacionesGuardadas = localStorage.getItem("puntuaciones");
  if (puntuacionesGuardadas) {
    puntuaciones = JSON.parse(puntuacionesGuardadas);
  }
}

function actualizarTablaPuntuaciones() {
  const tablaPuntuaciones = document.getElementById("tablaPuntuaciones");

  if (puntuaciones.length === 0) {
    tablaPuntuaciones.innerHTML = "<p>No hay puntuaciones todavía.</p>";
    return;
  }

  let html = "<ol>";
  puntuaciones.forEach((puntuacion) => {
    html += `<li><strong>${puntuacion.iniciales}</strong>: ${puntuacion.intentosUsados} / ${puntuacion.totalIntentos} intentos usados (${puntuacion.eficiencia}%)</li>`;
  });
  html += "</ol>";

  tablaPuntuaciones.innerHTML = html;
}

function borrarPuntuaciones() {
  if (confirm("¿Seguro que quieres borrar todas las puntuaciones?")) {
    localStorage.removeItem("puntuaciones");
    puntuaciones = [];
    actualizarTablaPuntuaciones();
  }
}

function descargarPuntuacionesXML() {
  if (puntuaciones.length === 0) {
    alert("No hay puntuaciones para exportar.");
    return;
  }

  // Generamos el contenido del XML

  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<puntuaciones>\n';
  puntuaciones.forEach(p => {
    xmlContent += '  <puntuacion>\n';
    xmlContent += `    <iniciales>${p.iniciales}</iniciales>\n`;
    xmlContent += `    <intentosUsados>${p.intentosUsados}</intentosUsados>\n`;
    xmlContent += `    <totalIntentos>${p.totalIntentos}</totalIntentos>\n`;
    xmlContent += `    <eficiencia>${p.eficiencia}</eficiencia>\n`;
    xmlContent += '  </puntuacion>\n';
  });
  xmlContent += '</puntuaciones>';

  // Crear un blob con el contenido XML

  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url  = URL.createObjectURL(blob);
  // Crear un enlace de descarga temporal
  const a = document.createElement("a");
  a.href = url;
  a.download = "puntuaciones.xml";
  document.body.appendChild(a);
  a.click();
  // Limpiar
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importarPuntuaciones() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];
  if (!file) {
    alert("Por favor selecciona un archivo XML para importar.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(e.target.result, "application/xml");
    const entradas = xmlDoc.getElementsByTagName("puntuacion");
    let puntuacionesImportadas = [];

    for (let i = 0; i < entradas.length; i++) {
      const iniciales = entradas[i].getElementsByTagName("iniciales")[0]?.textContent;
      const intentosUsados = parseInt(entradas[i].getElementsByTagName("intentosUsados")[0]?.textContent);
      const totalIntentos = parseInt(entradas[i].getElementsByTagName("totalIntentos")[0]?.textContent
      );

      if (!iniciales || isNaN(intentosUsados) || isNaN(totalIntentos)) continue;

      puntuacionesImportadas.push({ iniciales, intentosUsados, totalIntentos, eficiencia: ((intentosUsados / totalIntentos) * 100).toFixed(2)});
    }

    if (puntuacionesImportadas.length === 0) {
      alert("No se encontraron puntuaciones válidas en el archivo.");
      return;
    }

    const puntuacionesExistentes = JSON.parse(localStorage.getItem("puntuaciones")) || [];
    const puntuacionesCombinadas = puntuacionesExistentes.concat(puntuacionesImportadas);
    // Ordenar por eficiencia (menor porcentaje es mejor)

    localStorage.setItem("puntuaciones", JSON.stringify(puntuacionesCombinadas));
    actualizarTablaPuntuaciones();

    alert("✅ Puntuaciones importadas correctamente ✅");
    fileInput.value = ""; // Limpiar el input
  };

  reader.readAsText(file);
}
