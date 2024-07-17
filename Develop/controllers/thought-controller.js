const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

const ThoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get specific thought
    async getThoughtsById(req, res) {
        try {
            const thought = await Thought.findOne({_id:req.params.thoughtId});
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
        } else {
            res.json(thought);
        }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // delete thought
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.status(200).json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update thought
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {new: true});
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create reaction
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );

            if (reaction) {
                res.status(200).json(reaction);
            } else {
                res.status(404).json({ message: 'Something went wrong' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete reaction
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );

            if (reaction) {
                res.status(200).json(reaction);
            } else {
                res.status(404).json({ message: 'Something went wrong' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = ThoughtController;