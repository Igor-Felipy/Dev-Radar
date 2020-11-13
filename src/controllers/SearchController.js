const { response } = require("express");
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray')


module.exports = {
    async index(request, reponse) {
        console.log(request.query);
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                  $geometry: {
                      type: 'point',
                      coordinates: [longitude, latitude],
                  },
                  $maxDistance: 10000,
                },
            },
        })

        return response.json({ devs });
    }
}