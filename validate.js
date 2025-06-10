const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";
const WHATSAPP = "https://wa.me/5219632528129?text=";

async function validarCertificado() {
  const estadoElem = document.getElementById("estado");

  try {
    const response = await fetch(`${SHEET_URL}?id=${id}&marcar=usado`);
    const data = await response.json();

    if (data.estado === "ok") {
      window.location.href = WHATSAPP +
        encodeURIComponent(
          `🎉 Número de certificado: ${id}\n🎁 Regalos de: Avon\n💈 Servicio de corte de cabello + masaje de espalda\n📅 Adquisición: 09/06/20`
        );
    } else {
      estadoElem.innerHTML = "⚠️ Error al validar el certificado.";
    }
  } catch (e) {
    estadoElem.innerHTML = "⚠️ Error de conexión con el servidor.";
    console.error(e);
  }
}

validarCertificado();
