const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";
const WHATSAPP = "https://wa.me/5219632528129?text=";

async function validarCertificado() {
  const estadoElem = document.getElementById("estado");

  if (!id) {
    estadoElem.innerHTML = "❌ No se proporcionó un ID válido.";
    return;
  }

  try {
    const response = await fetch(`${SHEET_URL}?id=${id}&marcar=usado`);
    const data = await response.json();

    if (data.estado === "Activo") {
      // Redirige a WhatsApp solo si es ACTIVO
      const mensaje = `🎉 Número de certificado: ${id}\n🎁 Regalos de: ${data.nombre}\n💈 Servicio: ${data.promocion}\n💵 Costo: $${data.costo}\n📅 Fecha: ${data.fecha}`;
      window.location.href = WHATSAPP + encodeURIComponent(mensaje);
    } else if (data.estado === "Usado") {
      estadoElem.innerHTML = "❌ Este certificado ya fue utilizado.";
    } else {
      estadoElem.innerHTML = "⚠️ Certificado no válido.";
    }
  } catch (e) {
    estadoElem.innerHTML = "⚠️ Error de conexión al validar el certificado.";
    console.error(e);
  }
}

validarCertificado();
