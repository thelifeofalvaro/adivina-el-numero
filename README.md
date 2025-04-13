# adivina-el-numero
# 🎯 Adivina el Número – Juego Web Interactivo

¡Bienvenido/a al clásico juego de adivinar el número, pero ahora en versión web y con estilo propio!  
Este proyecto está hecho en HTML, CSS y JavaScript puro, ideal para practicar lógica, manipulación del DOM, almacenamiento local y generación de archivos XML. 🧠💡

---

## 🕹️ ¿En qué consiste?

La aplicación **elige un número aleatorio** dentro de un rango definido por el usuario.  
Tu misión es **adivinarlo en un número limitado de intentos**. Con cada intento, recibirás pistas sobre si el número secreto es mayor o menor. ¡Pero cuidado! Si te quedas sin intentos... ¡Game Over! 💀

---

## ✨ Características ✨

- 🔢 El usuario define el **rango de números** y la **cantidad de intentos disponibles**
- 👤 Se ingresan **3 iniciales** para registrar el puntaje
- 🎯 El número aleatorio se mantiene hasta que se acierte o se terminen los intentos
- 💬 Mensajes visuales según el resultado:
  - 🟢 Verde: ¡Correcto!
  - 🔵 Azul: El número secreto es mayor
  - 🟠 Naranja: El número secreto es menor
  - 🔴 Rojo: Entrada inválida o fuera de rango
- 📊 Puntajes ordenados por eficiencia (% de intentos usados)
- 💾 Puntajes guardados en **localStorage**
- 📥 Opción de **descargar los puntajes como XML**
- 🧼 Botón para **borrar todos los puntajes**

---

📁 Estructura del proyecto

adivina-el-numero/

├── index.html         # Página principal del juego

├── style.css          # Estilos visuales

├── script.js          # Lógica del juego

└── README.md          # Este archivo 📝

---

📦 Tecnologías usadas
- HTML5
- CSS3
- JavaScript (vanilla)
- Web Storage API (localStorage)
- Blob API para exportar XML

---

💡 Posibles mejoras para futuras veriones

🎵 Añadir efectos de sonido

📱 Versión responsive móvil

🌐 Publicarlo con GitHub Pages

🏆 Tabla de líderes global (con backend)

---

🖥️ Demo en vivo

📌 (Pendiente de publicar)

