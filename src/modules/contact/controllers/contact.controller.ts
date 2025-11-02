import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendContactEmail = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Configurar transporte de Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // tu cuenta gmail
        pass: process.env.SMTP_PASSWORD, // app password
      },
    });

    // Enviar correo
    const info = await transporter.sendMail({
      from: `"ismaelplg.github.io" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Correo:</b> ${email}</p>
        <p><b>Mensaje:</b></p>
        <p>${message}</p>
        <br/>
        <small>Enviado automáticamente desde ismaelplg.github.io</small>
      `,
    });

    console.log('Correo enviado:', info.response);
    return res
      .status(200)
      .json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (err) {
    console.error('Error al enviar correo:', err);
    return res
      .status(500)
      .json({ error: 'Error al enviar el mensaje', details: err });
  }
};
