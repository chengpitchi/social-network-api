const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought, 
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(addReaction); 

router.route('/:thoughtId/reactions/:reactionId')
  .put(removeReaction); 

module.exports = router;