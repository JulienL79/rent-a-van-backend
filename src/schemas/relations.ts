import { relations } from "drizzle-orm";
import { users, roles, categories, vehicles, pictures, passwordResetToken } from "./";

export const userRelations = relations(users, ({ many, one }) => ({
    vehicles: many(vehicles), // un user peut avoir plusieurs vehicules
    pictures: many(pictures), // un user peut avoir plusieurs pictures
    passwordResetToken: many(passwordResetToken),
    role: one(roles, { // Le nom de la table est ref ici, un user lié à 1 seul role
        // 1erement, on recup la colonne qui fait ref à users dans la table comment
        fields: [users.roleId],
        // 2emement on recup la colonne/table qui fait ref à la colonne authorId de la table comments
        references: [roles.id]
    })
}));

export const vehicleRelations = relations(vehicles, ({ many, one }) => ({
    pictures: many(pictures),
    user: one(users, {
        fields: [vehicles.userId],
        references: [users.id]
    }),
    category: one(categories, {
        fields: [vehicles.categoryId],
        references: [categories.id]
    }),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
    vehicles: many(vehicles),
}));

export const roleRelations = relations(roles, ({ many }) => ({
    users: many(users),
}));

export const passwordResetTokenRelations = relations(passwordResetToken, ({ one }) => ({
    user: one(users, {
        fields: [passwordResetToken.userId],
        references: [users.id]
    }),
}));

export const pictureRelations = relations(pictures, ({ one }) => ({
    user: one(users, {
        fields: [pictures.userId],
        references: [users.id]
    }),
    vehicle: one(vehicles, {
        fields: [pictures.vehicleId],
        references: [vehicles.id]
    }),
}));