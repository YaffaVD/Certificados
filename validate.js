const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";
const estadoElem = document.getElementById("estado");

async function validarCertificado() {
  if (!id) {
    estadoElem.innerHTML = "❌ ID no especificado.";
    return;
  }

  try {
    // Paso 1: consultar datos del certificado
    const response = await fetch(`${SHEET_URL}?id=${id}`);
    const data = await response.json();

    if (data.estado === "No encontrado") {
      estadoElem.innerHTML = "⚠️ Certificado no válido o no encontrado.";
      return;
    }

    if (data.estado === "Usado") {
      estadoElem.innerHTML = "⚠️ Este certificado ya fue usado.";
      return;
    }

    // Paso 2: marcar como usado automáticamente
    await fetch(`${SHEET_URL}?id=${id}&marcar=usado`);

    // Paso 3: redirigir a WhatsApp con los datos
    const mensaje = `Número de certificado: ${id}\nRegalos de: ${data.nombre}\n${data.promocion}\nAdquisición del servicio: ${data.fecha || "Sin fecha"}`;
    const urlWhatsApp = `https://wa.me/5219632528129?text=${encodeURIComponent(mensaje)}`;
    
    window.location.href = urlWhatsApp;
  } catch (e) {
    estadoElem.innerHTML = "⚠️ Error al validar el certificado.";
    console.error(e);
  }
}

validarCertificado();
