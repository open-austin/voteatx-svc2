/**
 * Voting_location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var METERS_PER_MILE = 1609.34;

module.exports = {

  attributes: {
    address: {
      type: 'string',
      unique: true,
      required: true
    },
    /*
    location: {
      model: 'geolocation'
    },
    */
    location: {
      type: 'json',
      isLocation: true
    },
    county_name: {
      type: 'string',
      required: true
    },
    location_name: {
      type: 'string',
      required: true
    },
    schedules: {
      collection: 'Schedule'
    }
  },
  types: {
    isLocation: function(value) {
      return value.type === 'Point' &&
        value.coordinates.length == 2;
        //TODO confirm coordinates are numbers, not strings
    }
  },

  findNearby: function(longitude, latitude, withinMiles, cb) {
		var searchCriteria = {
      where: {
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: withinMiles * METERS_PER_MILE
          }
        }
			},
      limit: 3
		};
    console.log("finding for ", searchCriteria);

    Voting_location.find(searchCriteria).exec((err, locs) => {
      if(err) cb(err);
      else cb(null, locs);
    });
  }
};
