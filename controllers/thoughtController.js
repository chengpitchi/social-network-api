const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Gets a single thought by id
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Creates a new thought. 
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          // add thought to user as well
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              })
            : res.json('Created the thought 🎉')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // Deletes a thought from the database. 
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            // remove thought from user as well
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought deleted but no user with this id!',
              })
            : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
/*
    // Adds a tag to an application. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
    addTag(req, res) {
      Application.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $addToSet: { tags: req.body } },
        { runValidators: true, new: true }
      )
        .then((application) =>
          !application
            ? res.status(404).json({ message: 'No application with this id!' })
            : res.json(application)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove application tag. This method finds the application based on ID. It then updates the tags array associated with the app in question by removing it's tagId from the tags array.
    removeTag(req, res) {
      Application.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $pull: { tags: { tagId: req.params.tagId } } },
        { runValidators: true, new: true }
      )
        .then((application) =>
          !application
            ? res.status(404).json({ message: 'No application with this id!' })
            : res.json(application)
        )
        .catch((err) => res.status(500).json(err));
    },
*/
};
  