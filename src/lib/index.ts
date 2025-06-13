import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '$env/static/private';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: MAIL_HOST as string,
	port: +MAIL_PORT,
	secure: false,
	auth: {
		user: MAIL_USER,
		pass: MAIL_PASS
	}
});

export async function mailOnLogin({ clientEmail }: { clientEmail: string }) {
	try {
		const info = await transporter.sendMail({
			from: '"WhatsApp Clone Team" <no-reply@whatsappclone.com>',
			to: clientEmail,
			subject: 'Login Notification',
			text: `Hello,\n\nWe noticed a login to your account. If this was you, no action is needed. If you suspect any unauthorized access, please reset your password immediately.\n\nThank you,\nWhatsApp Clone Team`, // plain text body
			html: `<p>Hello,</p>
       <p>We noticed a login to your account. If this was you, no action is needed. If you suspect any unauthorized access, please reset your password immediately.</p>
       <p>Thank you,<br>WhatsApp Clone Team</p>`
		});
		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	} catch (error) {
		console.log(error);
		throw new Error('Failed to send login email');
	}
}
