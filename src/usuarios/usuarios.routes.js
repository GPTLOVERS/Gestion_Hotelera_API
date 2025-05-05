import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser } from "./usuarios.controller.js";
import { getUserByIdValidator,deleteUserValidator,updatePasswordValidator,updateUserValidator } from "../middlewares/usuario-validator.js"; 
import { validateJWT } from "../middlewares/validate-token.js";
import { hasRoles } from "../middlewares/validate-roles.js";

const router = Router()

router.get(
    "/findUser/:uid",
    getUserByIdValidator,
    getUserById
);

router.get(
    "/findUser/",
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    getUsers
);

router.patch(
    "/deleteUser/:uid", 
    deleteUserValidator, 
    deleteUser
);

router.patch(
    "/updatePassword/:uid", 
    updatePasswordValidator, 
    updatePassword
);

router.put(
    "/updateUser/:uid", 
    updateUserValidator, 
    updateUser
);

export default router