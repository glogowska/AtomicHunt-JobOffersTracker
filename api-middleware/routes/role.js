import express from 'express';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

//Create a new role in DB
router.post('/create', verifyAdmin, createRole);

//Update role in DB
router.put('/update/:id', verifyAdmin, updateRole);

//Get all the roles from DB
router.get('/getAll', verifyAdmin, getAllRoles);

//Delete the role from DB
router.delete('/deleteRole/:id', verifyAdmin, deleteRole);

export default router;