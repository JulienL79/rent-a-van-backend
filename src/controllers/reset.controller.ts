import { Request, Response } from "express";
import { APIResponse, hashPassword, logger, verifyPassword } from "../utils";
import { passwordResetTokenModel, userModel } from "../models";
import { emailValidation, resetPasswordValidation, updateCredentialsValidation, userRegisterValidation, userUpdateValidation } from "../validations";
import { sendResetEmail } from "../utils/mailer";

const resetController = {
    requestResetPassword: async (request: Request, response: Response) => {
        try {
            logger.info(`[POST] Demande de réinitialisation de mot de passe`);

            const { email } = emailValidation.parse(request.body);

            const [ user ] = await userModel.findByCredentials(email);
            if (!user) {
                logger.error("Adresse mail non reliée à un compte");
                return APIResponse(response, null, "Si un compte est associé à cette adresse, un email de réinitialisation a été envoyé.", 200);
            }

            const [{ token }] = await passwordResetTokenModel.create({
                expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expiration après 15 minutes
                userId: user.id
            })

            await sendResetEmail(email, token)

            return APIResponse(response, null, "Si un compte est associé à cette adresse, un email de réinitialisation a été envoyé.", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
            APIResponse(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    },
    resetPassword : async (request: Request, response: Response) => {
        try {
            logger.info(`[UPDATE] Modification du mot de passe`);

            const { token, password } = resetPasswordValidation.parse(request.body);

            // Vérifier la validité du token
            const [tokenData] = await passwordResetTokenModel.getByToken(token);
            if (!tokenData || tokenData.isUsed || tokenData.expiresAt.getTime() < Date.now()) {
                logger.error("Token invalide ou expiré.");
                return APIResponse(response, null, "Token invalide ou expiré.", 400);
            }

            // Hasher le nouveau mot de passe
            const hash = await hashPassword(password);

            // Mettre à jour le mot de passe de l'utilisateur
            await userModel.update(tokenData.userId, {password: hash})

            // Invalider le token
            await passwordResetTokenModel.update(tokenData.id, {isUsed: true});

            APIResponse(response, null, "Mot de passe réinitialisé avec succès.", 200);
        } catch (error: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
            APIResponse(response, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
        }
    }
};

export default resetController;