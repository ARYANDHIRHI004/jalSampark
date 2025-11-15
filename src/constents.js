import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

export const env = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    ORIGIN: process.env.ORIGIN,
    ACCESS_TOKEN_SECRET: `${process.env.ACCESS_TOKEN_SECRET}`,
    ACCESS_TOKEN_EXPIRY: `${process.env.ACCESS_TOKEN_EXPIRY}`,

    REFRESH_TOKEN_SECRET: `${process.env.REFRESH_TOKEN_SECRET}`,
    REFRESH_TOKEN_EXPIRY: `${process.env.REFRESH_TOKEN_EXPIRY}`,
}

export const UserRolesEnum = {
    USER: "user",
    ADMIN: "admin",
    PLANNER: "planner",
    OPERATOR: "operator"
}
export const AvailableUserRoles = Object.values(UserRolesEnum)


export const DB_NAME = "IIITWaterDB"