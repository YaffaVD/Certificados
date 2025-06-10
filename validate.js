const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbziwMltRQsVnUb7lyVIvI0J_8UdLXq2H_69GX-Ko7Xc29cwWdWh7mdoHPoEKZQbJXp3/exec";
const WHATSAPP_BASE = "https://wa.me/5219632528129?text=";

async function validarCertificado() {
  const estadoElem = document.getElementById("estado");
  estadoElem.innerText = "Validando certificado...";

  try {
    const response = await fetch(`${SHEET_URL}?id=${id}&marcar=usado`);
    const data = await response.json();

    if (!data || !data.estado) {
      estadoElem.innerHTML = "⚠️ Certificado no encontrado.";
      return;
    }

    const mensaje = `📄 *Certificado No:* ${id}
🎁 *Regalos de:* ${data.nombre}
💈 *Servicio:* ${data.promocion}
💵 *Costo:* $${data.costo}
📅 *Fecha:* ${data.fecha}

---

📄 *Certificate No:* ${id}
🎁 *Gift from:* ${data.nombre}
💈 *Service:* ${data.promocion}
💵 *Cost:* $${data.costo}
📅 *Date:* ${data.fecha}`;

    const urlWhatsapp = `${WHATSAPP_BASE}${encodeURIComponent(mensaje)}`;

    estadoElem.innerText = "Redirigiendo a WhatsApp...";

    // Redirecciona después de 1 segundo para evitar bloqueo
    setTimeout(() => {
      window.location.href = urlWhatsapp;
    }, 1000);

  } catch (error) {
    estadoElem.innerHTML = "⚠️ Error al validar el certificado.";
    console.error(error);
  }
}

validarCertificado();
