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

const auth_user = require('../utils/auth_user');
const db = require("../models");
const User = db.User;
const fs = require('fs');
const bcrypt = require('bcryptjs');



async function detail(req, res) {
    let user = await auth_user(req)
    res.status(200).send({
        data: user,
        status: true,
        message: ""
    });
    return;
}

async function password(req, res) {

    if (!req.body.current_password) {
        res.status(400).send({
            message: "The field current_password can not be empty!"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "The field password can not be empty!"
        });
        return;
    }

    if (!req.body.password_confirmation) {
        res.status(400).send({
            message: "The field password_confirmation can not be empty!"
        });
        return;
    }


    let session = await auth_user(req)
    let user = await User.findOne({ where: { id: session.id } })
    let current_password = req.body.current_password;
    let password = req.body.password;
    let password_confirmation = req.body.password_confirmation;

    if (password.length < 8) {
        res.status(400).send({
            message: "The password must be at least 8 characters.!"
        });
        return;
    }

    if (password_confirmation !== password) {
        res.status(400).send({
            message: "The password confirmation does not match.!"
        });
        return;
    }

    if (!bcrypt.compareSync(current_password, user.password)) {
        res.status(400).send({
            message: "Your password was not updated, since the provided current password does not match.!!"
        });
        return;
    }

    let formUpdate = {
        password: bcrypt.hashSync(password, 10),
        updated_at: new Date()
    }

    await User.update(formUpdate, {
        where: {
            id: user.id
        }
    })

    res.status(200).send({
        data: {},
        status: true,
        message: "Your password has been changed!!"
    });
    return;

}

async function update(req, res) {

    if (!req.body.email) {
        res.status(400).send({
            message: "The field email can not be empty!"
        });
        return;
    }

    let user = await auth_user(req)
    let email = req.body.email;
    let phone = req.body.phone;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let gender = req.body.gender;
    let country = req.body.country;
    let address = req.body.address;
    let about_me = req.body.about_me;
    let jobTitle = req.body.jobTitle;
    let facebook = req.body.facebook;
    let twitter = req.body.twitter;
    let instagram = req.body.instagram;
    let linkedIn = req.body.linkedIn;
    let aboutMe = req.body.aboutMe;

    let findUserByEmail = await User.findOne({
        where: {
            email: email
        }
    });
    if (findUserByEmail) {
        if (parseInt(findUserByEmail.id) !== parseInt(user.id)) {
            res.status(400).send({
                message: "The email address has already been taken.!"
            });
            return;
        }
    }

    if (phone) {
        let findUserByPhone = await User.findOne({
            where: {
                phone: phone
            }
        });
        if (findUserByPhone) {
            if (parseInt(findUserByPhone.id) !== parseInt(user.id)) {
                res.status(400).send({
                    message: "The phone number has already been taken.!"
                });
                return;
            }
        }
    }

    let updateUser = {
        email: email,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        country: country,
        address: address,
        about_me: about_me,
        jobTitle: jobTitle,
        facebook: facebook,
        instagram: instagram,
        linkedIn: linkedIn,
        twitter: twitter,
        aboutMe: aboutMe,
        updated_at: new Date()
    }

    await User.update(updateUser, {
        where: {
            id: user.id
        }
    })

    let userUpdated = await auth_user(req)

    res.status(200).send({
        data: userUpdated,
        status: true,
        message: "Your profile has been changed"
    });
    return;
}



async function upload(req, res) {

    let user = await auth_user(req)
    if (req.file) {

        let app_path = await getAppPath();

        if (user.image) {
            let imageExists = user.image
            let fileUpload = app_path+'/' + imageExists
            if (fs.existsSync(fileUpload)) {
                fs.unlink(app_path+'/' + imageExists, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }


        let file = req.file
        let fileUrl = file.destination + "" + file.filename

        await User.update({
            image: fileUrl
        }, {
            where: {
                id: user.id
            }
        })

        res.status(200).send({
            data: {
                image: fileUrl
            },
            status: true,
            message: "Your profile image has been changed"
        });

    } else {
        res.status(200).send({
            data: {
                image: user.image
            },
            status: true,
            message: "Your profile image has been changed"
        });
    }
}

async function getAppPath() {
    const { dirname } = require('path');
    const { constants, promises: { access } } = require('fs');
    
    for (let path of module.paths) {
      try {
        await access(path, constants.F_OK);
        return dirname(path);
      } catch (e) {
        // Just move on to next path
      }
    }
  }

module.exports = {
    detail,
    upload,
    update,
    password
}