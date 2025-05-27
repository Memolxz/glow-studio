import { UserService } from "../services/userService";
const userService = new UserService();
export const getAllUsers = async (_, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ ok: true, data: users });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const userIdToGet = parseInt(req.params.id);
        const user = await userService.getUserById(userIdToGet);
        res.status(200).json({ ok: true, data: user });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
export const createUser = async (req, res) => {
    try {
        const userFromRequest = req.body;
        const userCreated = await userService.createUser(userFromRequest);
        res.status(201).json({ ok: true, data: userCreated });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const userIdToModify = req.params.id;
        const userBody = req.body;
        const userModified = await userService.updateUser({ id: userIdToModify, ...userBody });
        res.status(200).json({ ok: true, data: userModified });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
export const patchUser = async (req, res) => {
    try {
        const userIdToModify = parseInt(req.params.id);
        const userBody = req.body;
        const fullUser = await userService.getUserById(userIdToModify);
        // Primero desestructuro todo el fullUser, luego desestructuro los atributos que me
        // hayan pasado en el body para sobrescribir los primeros
        const fullUserBody = { ...fullUser, ...userBody };
        const userModified = await userService.updateUser(fullUserBody);
        res.status(200).json({ ok: true, data: userModified });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const userIdToDelete = parseInt(req.params.id);
        await userService.deleteUser(userIdToDelete);
        res.status(200).json({ ok: true });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
