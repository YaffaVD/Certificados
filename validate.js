const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const estadoElem = document.getElementById("estado");
const selector = document.getElementById("selector");
const boton = document.querySelector("button");

const SHEET_URL = "https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbzvSUTDKOSSFV4yzmdTXJuBy4ztRDWpQVJT51ETP8m2t6-JwMwWausrUV5m_7qtYFykYg/exec"; // 👈 pon tu URL final

let certificadoListo = false;

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
      selector.classList.add("oculto");
      return;
    }

    estadoElem.textContent = "✅ Certificado válido. Elige la sucursal para enviar.";
    certificadoListo = true;
    selector.classList.remove("oculto");
  } catch (error) {
    estadoElem.textContent = "❌ Error al validar el certificado.";
    console.error(error);
  }
}

async function enviarWhatsapp() {
  if (!certificadoListo) return;

  const sucursal = document.getElementById("sucursal").value;
  if (!sucursal) {
    alert("Selecciona una sucursal.");
    return;
  }

  try {
    const res = await fetch(`${SHEET_URL}?id=${id}&sucursal=${encodeURIComponent(sucursal)}`);
    const data = await res.json();

    if (!data.valido) {
      estadoElem.textContent = "⚠️ Este certificado ya fue utilizado.";
      selector.classList.add("oculto");
      return;
    }

    const mensaje = `Número de certificado: ${id}%0ARegalo de: ${data.nombre}%0APromoción: ${data.promocion}%0ACosto: $${data.costo}%0ASucursal: ${sucursal}`;
    
    // ✅ Para compatibilidad con Android, usa setTimeout
    setTimeout(() => {
      window.location.href = `https://wa.me/5219632528129?text=${mensaje}`;
    }, 300);
  } catch (error) {
    estadoElem.textContent = "❌ Error al enviar mensaje de WhatsApp.";
    console.error(error);
  }
}

validarCertificado();
