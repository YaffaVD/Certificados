const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const WHATSAPP_BASE = "https://wa.me/5219632528129?text=";
const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";

async function validarCertificado() {
  const estadoElem = document.getElementById("estado");
  try {
    const response = await fetch(`${SHEET_URL}?id=${id}&marcar=usado`);
    const data = await response.json();

    if (data.estado === "Activo" || data.estado === "Usado") {
      const mensaje = `Certificate No: ${id}\nFrom: ${data.nombre}\nService: ${data.promocion}\nCost: $${data.costo}\nDate: ${data.fecha}`;
      window.location.href = `${WHATSAPP_BASE}${encodeURIComponent(mensaje)}`;
    } else {
      estadoElem.innerHTML = "⚠️ Certificate not found or invalid.";
    }
  } catch (error) {
    estadoElem.innerHTML = "⚠️ Error validating the certificate.";
    console.error(error);
  }
}

validarCertificado();
