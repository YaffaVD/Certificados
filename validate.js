const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const estadoElem = document.getElementById("estado");
const selector = document.getElementById("selector");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzvSUTDKOSSFV4yzmdTXJuBy4ztRDWpQVJT51ETP8m2t6-JwMwWausrUV5m_7qtYFykYg/exec";

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
      estadoElem.textContent = "⚠️ Este certificado ya fue utilizado o no existe.";
      return;
    }

    datosCertificado = data;

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
    const res = await fetch(`${SHEET_URL}?id=${id}&sucursal=${encodeURIComponent(sucursal)}`);
    const data = await res.json();

    if (!data.valido) {
      estadoElem.textContent = "⚠️ Este certificado ya fue utilizado.";
      return;
    }

    const mensaje = `Número de certificado: ${id}%0ARegalo de: ${data.nombre}%0APromoción: ${data.promocion}%0ACosto: $${data.costo}`;
    window.location.href = `https://wa.me/5219632528129?text=${mensaje}`;
  } catch (error) {
    estadoElem.textContent = "❌ Error al generar mensaje de WhatsApp.";
    console.error(error);
  }
}

validarCertificado();
