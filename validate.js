const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const mensajeDiv = document.getElementById("mensaje");
const sucursalContainer = document.getElementById("sucursal-container");
const sucursalSelect = document.getElementById("sucursal");
const enviarBtn = document.getElementById("enviarBtn");

fetch(`${SHEET_URL}?id=${id}`)
  .then((res) => res.json())
  .then((data) => {
    if (data.estado === "Usado") {
      mensajeDiv.textContent = "Este certificado ya fue utilizado.";
    } else if (data.estado === "Activo") {
      mensajeDiv.textContent = `Certificado válido. Regalo de: ${data.nombre}`;
      sucursalContainer.classList.remove("oculto");

      enviarBtn.addEventListener("click", () => {
        const sucursal = sucursalSelect.value;
        const fechaEscaneo = new Date().toLocaleDateString("es-MX");

        fetch(`${SHEET_URL}?id=${id}&marcar=usado&sucursal=${encodeURIComponent(sucursal)}&fecha=${encodeURIComponent(fechaEscaneo)}`)
          .then(() => {
            const mensaje = `Número de certificado: ${id}%0ARegalo de: ${data.nombre}%0APromoción: ${data.promocion}%0ACosto: $${data.costo}%0AFecha: ${fechaEscaneo}`;
            const telefono = "5219632528129";
            window.location.href = `https://wa.me/${telefono}?text=${mensaje}`;
          });
      });
    } else {
      mensajeDiv.textContent = "Certificado no encontrado.";
    }
  })
  .catch(() => {
    mensajeDiv.textContent = "Error al validar el certificado.";
  });
