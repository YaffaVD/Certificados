const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const estadoElem = document.getElementById("estado");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxKOM3iS8NXYXYEQPFpKrzx0MgVLgkdL7D8YTgiyGwEiKTjVHrygwBMW2NpX1CRhs_huQ/exec";

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

    estadoElem.textContent = "✅ Certificado válido. Redireccionando a WhatsApp...";

    const mensaje = `Número de certificado: ${id}%0ARegalo de: ${data.nombre}%0APromoción: ${data.promocion}%0ACosto: $${data.costo}`;
    setTimeout(() => {
      window.location.href = `https://wa.me/5219632528129?text=${mensaje}`;
    }, 800);
  } catch (error) {
    estadoElem.textContent = "❌ Error al validar el certificado.";
    console.error(error);
  }
}

validarCertificado();
