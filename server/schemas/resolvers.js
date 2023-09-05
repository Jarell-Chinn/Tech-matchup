const { Matchup, Tech } = require('../models');

const resolvers = {
    Query: {
        tech: async () => {
            return await Tech.find();
        },
        matchups: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return await Matchup.findById(params).sort({ createdAt: -1 });
        },
    },
    Mutation: {
        createMatchup: async (parent, args) => {
            const matchup = await Matchup.create(args);
            return matchup;
        },
        createVote: async (parent, { id, techNum }) => {
            const matchup = await Matchup.findOneAndUpdate(
                { _id: id },
                { $inc: { [`tech${techNum}_votes`]: 1 } },
                { new: true }
            );
            return matchup;
        },
    },
};
