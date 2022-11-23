const nodemailer = require('nodemailer');
require('dotenv').config();

const user = process.env.MAILER_EMAIL;
const pass = process.env.MAILER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: user,
        pass: pass
    }
});

const sendConfirmationEmail = async (email, confirmationCode) => {
    try {
        await transporter.sendMail({
            from: user,
            to: email,
            subject: 'Por favor, confirma tu cuenta de FYD',
            html: `<h1>Por favor, confirma tu cuenta de FYD</h1>
                   <p>Para confirmar tu cuenta, por favor, haz click en el siguiente enlace:</p>
                    <a href="http://localhost:4200/confirm/${confirmationCode}">Confirmar cuenta</a>`
        });
    } catch (error) {
        throw {status: 500, message: error?.message || error, type: 'server error'};
    }
}

module.exports = { sendConfirmationEmail };
