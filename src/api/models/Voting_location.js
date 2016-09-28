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

    Voting_location.find(searchCriteria).exec((err, locs) => {
      if(err) cb(err);
      else cb(null, locs);
    });
  },

  findLocationsBySchedule: function(scheduleId, cb) {
    /*
    Voting_location
      .native(function(err, col) {
        col.find({
          $and: [
            {
              schedules:{
                $exists:true
              }
            },
            {
              schedules:scheduleId
            }
          ]
        }).toArray(function (err, results) {
          if (err) return cb(err);
          else cb(null, results);
        });
      })
      //*/
    Voting_location
      .find()
      .populate("schedules")
      .exec(function(err, locs) {
        if(err) cb(err);
        withSchedule = [];
        withoutSchedule = [];
        nextLoc: for (loc of locs) {
          for(sched of loc.schedules) {
            console.log("Found schedule", scheduleId, sched, loc);
            if(sched.id === scheduleId) {
              withSchedule.push(loc);
              continue nextLoc;
            }
          }
          // the continue will skip this if the schedule is found
          withoutSchedule.push(loc);
        }
        cb(null, {withSchedule: withSchedule, withoutSchedule: withoutSchedule});
      })
  }
};
