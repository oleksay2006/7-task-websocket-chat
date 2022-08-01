const express = require('express');

const router = express.Router();
const userController = require('./index');
const { auth } = require('../../middleware/auth');

router.get('/register', userController.registerPage);

router.post('/registerNewUser', userController.newUser);

router.get('/profile/:id', userController.getUser);
// router.get('/profile/:id', auth, userController.getUser);

router.get('/list/:id', auth, userController.getUsers);

router.put('/update/:id', auth, userController.updateUser);

router.put('/updateStatus/:id', userController.updateStatus);

router.delete('/delete/:id', auth, userController.deleteUser);

router.get('/chat/:id', userController.mainPage);

router.get('/', userController.loginPage);

router.post('/loginUser', userController.loginUser);

router.post('/refresh/:id', userController.refreshTokenUser);

router.get('/logout/:id', userController.logoutUser);

module.exports = router;
