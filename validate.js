const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const estadoElem = document.getElementById("estado");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzqlU5MdxJ5lWi1ypKkXXNwf5TYpx9RnZE8IVslHJbn2Owg9j34M4dFh3BlSFbA5Zx3rg/exec"; // Reemplaza con el tuyo

async function validarCertificado() {
  if (!id) {
    estadoElem.textContent = "❌ No se proporcionó el ID del certificado.";
    return;
  }

  try {
    const res = await fetch(`${SHEET_URL}?id=${id}`);
    const data = await res.json();

    if (!data.valido) {
      estadoElem.textContent = "⚠️ Este certificado ya fue utilizado.";
      return;
    }

    estadoElem.textContent = "✅ Certificado válido. Redireccionando a WhatsApp...";

    const mensaje = `Número de certificado: ${id}%0A🎁 Regalo de: ${data.de}%0A🎉 Para: ${data.para}%0A🏷 Promoción: ${data.promo}%0A💲 Costo: $${data.costo}`;
    setTimeout(() => {
      window.location.href = `https://wa.me/5219632528129?text=${mensaje}`;
    }, 1000);
  } catch (error) {
    estadoElem.textContent = "❌ Error al validar el certificado.";
    console.error(error);
  }
}

validarCertificado();
