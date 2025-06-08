import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from './logger';
import { APIResponse } from './response';

const { RESET_MAIL_ADDRESS, WEBSITE_URL, PASSWORD_RESET_MAIL } = env

const transporter = nodemailer.createTransport({
    service: "gmail", // Peut être remplacé par un autre service SMTP
    auth: {
        user: RESET_MAIL_ADDRESS,
        pass: PASSWORD_RESET_MAIL
    }
});

export const sendResetEmail = async (userEmail: string, resetToken: string) => {
    const mailOptions = {
        from: RESET_MAIL_ADDRESS,
        to: userEmail,
        subject: "Réinitialisation de mot de passe",
        text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${WEBSITE_URL}/reset/${resetToken}`
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info("Email envoyé! ")
    } catch (error: any) {
        logger.error("Erreur d'envoi :", error);
        throw new Error ( "Erreur d'envoi du mail de réinitialisation")
    }
};