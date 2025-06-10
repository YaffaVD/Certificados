const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";
const WHATSAPP = "https://wa.me/5219632528129?text=";

async function validateCertificate() {
  const statusElem = document.getElementById("status");

  try {
    const response = await fetch(`${SHEET_URL}?id=${id}&marcar=usado`);
    const data = await response.json();

    if (data.estado === "Usado") {
      const msg = `Certificate ID: ${id}%0AGifted by: ${data.nombre}%0AService: ${data.promocion}%0ACost: $${data.costo}%0ADate: ${data.fecha}`;
      window.location.href = WHATSAPP + encodeURIComponent(msg);
    } else {
      statusElem.innerHTML = "⚠️ Certificate not found or invalid.";
    }
  } catch (e) {
    statusElem.innerHTML = "⚠️ Error validating the certificate.";
    console.error(e);
  }
}

validateCertificate();
