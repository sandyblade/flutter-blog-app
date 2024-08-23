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

const db = require("../models");
const Notification = db.Notification

async function notification(user_id) {
    return await Notification.findOne({
        order: [["id", "desc"]],
        where: {
            status: 0,
            userId: user_id
        }
    });
}

module.exports = {
    notification
}