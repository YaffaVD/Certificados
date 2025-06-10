const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const estadoElem = document.getElementById("estado");
const selector = document.getElementById("selector");
const boton = document.querySelector("button");

const SHEET_URL = "https://script.google.com/macros/s/TU_SCRIPT_ID/exec"; // Reemplaza con el tuyo

let datosCertificado = null;

async function validarCertificado() {
  if (!id) {
    estadoElem.textContent = "❌ No se proporcionó el ID del certificado.";
    return;
  }

  try {
    const res = await fetch(`${SHEET_URL}?id=${id}`);
    const data = await res.json();

    if (!data.valido) {
      estadoElem.innerHTML = "⚠️ Este certificado ya fue utilizado.";
      return;
    }

    datosCertificado = data; // ⬅️ Guardamos los datos válidos
    estadoElem.textContent = "✅ Certificado válido. Elige la sucursal para enviar.";
    selector.classList.remove("oculto");
  } catch (error) {
    estadoElem.textContent = "❌ Error al validar el certificado.";
    console.error(error);
  }
}

async function enviarWhatsapp() {
  const sucursal = document.getElementById("sucursal").value;
  if (!sucursal) {
    alert("Selecciona una sucursal.");
    return;
  }

  try {
    // Marcar como usado sin volver a validar
    await fetch(`${SHEET_URL}?id=${id}&sucursal=${encodeURIComponent(sucursal)}`);

    // Usamos los datos ya guardados (para evitar respuesta "Usado")
    const mensaje = `Número de certificado: ${id}%0ARegalo de: ${datosCertificado.nombre}%0APromoción: ${datosCertificado.promocion}%0ACosto: $${datosCertificado.costo}%0ASucursal: ${sucursal}`;
    window.location.href = `https://wa.me/5219632528129?text=${mensaje}`;
  } catch (error) {
    estadoElem.textContent = "❌ Error al enviar mensaje de WhatsApp.";
    console.error(error);
  }
}

validarCertificado();
