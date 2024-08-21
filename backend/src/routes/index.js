/**
 * This file is part of the Sandy Andryanto Blog Application.
 *
 * @author     Sandy Andryanto <sandy.andryanto.blade@gmail.com>
 * @copyright  2024
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

const appRouter = require('express').Router();
const authController = require("../controllers/auth.controller.js");
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const upload = multer({
    storage: storage
});

// Auth Pages
appRouter.post('/auth/login', authController.login);
appRouter.post('/auth/register', authController.register);
appRouter.get('/auth/confirm/:token', authController.confirm);
appRouter.post('/auth/email/forgot', authController.forgotPassword);
appRouter.post('/auth/email/reset/:token', authController.resetPassword);

module.exports = app => {
    app.use('/api', [appRouter]);
};