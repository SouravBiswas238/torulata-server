import express from 'express'
import contactCtrl from '../controllers/contactCtrl.js';

const router = express.Router();

router.route('/add').post(contactCtrl.addNewContact);


export default router;
