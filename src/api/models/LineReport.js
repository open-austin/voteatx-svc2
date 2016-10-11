module.exports = {
  attributes: {
    id: {
      type: 'string',
      required: true,
      primaryKey: true,
      columnName: 'ip'
    },
    reported_time: {
      type: 'datetime',
      required: true
    },
    location: {
      model: 'Voting_location'
    }
  },

  reportLongLine: function(ipAddress, location, cb) {
    LineReport.find({ip: ipAddress}).exec(function(err, locs) {
      console.log("found reports: ",locs);
      if(err) cb(err);
      else if(locs.length > 0) {
        cb({err:"Long line has already been reported."})
      } else {
        LineReport.create({
          id: ipAddress,
          reported_time: new Date(),
          location: location
        }).exec(function(err, report) {
          if(err) res.json(err);
          else cb(report);
        })
      }
    });
  }
};
