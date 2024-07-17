const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// GET and POST all users
router.route('/').get(getAllUsers).post(createUser);

// GET user id, update user id (PUT) and DELETE user
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// POST friend and DELETE Friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;