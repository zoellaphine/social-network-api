const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtById,
    createReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

// GET and POST all thoughts
router.route('/').get(getAllThoughts).post(createThought);

// GET PUT and DELETE thoughts
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

// POST reaction
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;