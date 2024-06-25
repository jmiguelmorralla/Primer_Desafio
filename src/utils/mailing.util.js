import { createTransport } from "nodemailer";
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
  try {
    const trasport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });
    //OPCIONALMENTE verificar el transporte
    await trasport.verify();
    await trasport.sendMail({
      from: `VITONIO <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.first_name} REGISTERED!`,
    //   corregir to upper case ... me llega undefined...
      html: `
        <h1>Bienvenido a Vitonio</h1>
        <h4>Por favor verifica tu cuenta para completar tu registro.</h4>
        <p>Código de verificación: ${data.code}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;