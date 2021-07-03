import express from 'express';
import * as userControllers from '../controllers/userControllers';
import * as doctorControllers from '../controllers/doctorControllers';
import validate from '../handlers/validation';
import { SaveUser } from '../middlewarse/validation';
import isLoggeIn  from '../middlewarse/auth';

const router = express.Router();

router.get('/', (req,res) => {
    res.json({message: 'hello everyone'});
});

router.post('/account/signup', validate(SaveUser), userControllers.register);
router.post('/account/sigin', userControllers.login);
router.get('/account/me', isLoggeIn, userControllers.me);
router.get('/account/profiel' , isLoggeIn,userControllers.getProfile);

router.get('/doctors', doctorControllers.index);


export default router;