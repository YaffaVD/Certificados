const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const estadoElem = document.getElementById("estado");
const selector = document.getElementById("selector");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";

async function validarCertificado() {
  if (!id) {
    estadoElem.textContent = "❌ No se proporcionó el ID del certificado.";
    return;
  }

  try {
    const res = await fetch(`${SHEET_URL}?id=${id}&marcar=usado`);
    const data = await res.json();

    if (data.estado === "Usado") {
      estadoElem.textContent = "⚠️ Este certificado ya fue utilizado.";
      return;
    }

    estadoElem.textContent = "✅ Certificado válido. Elige la sucursal para enviar.";
    selector.classList.remove("oculto");
  } catch (error) {
    estadoElem.textContent = "❌ Error al validar el certificado.";
    console.error(error);
  }
}

async function enviarWhatsapp() {
  const sucursal = document.getElementById("sucursal").value;

  try {
    const res = await fetch(`${SHEET_URL}?id=${id}&sucursal=${sucursal}`);
    const data = await res.json();

    const mensaje = `Número de certificado: ${id}%0ARegalo de: ${data.nombre}%0APromoción: ${data.promocion}%0ACosto: $${data.costo}%0AFecha: ${data.fecha}`;
    window.location.href = `https://wa.me/5219632528129?text=${mensaje}`;
  } catch (error) {
    estadoElem.textContent = "❌ Error al generar mensaje de WhatsApp.";
    console.error(error);
  }
}

validarCertificado();
