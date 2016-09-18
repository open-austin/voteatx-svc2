
module.exports = {
  locationsList: function(req, res) {
    Voting_location.findLocationsWithSchedule(req.scheduleId, function(err, locsWith) {
      if(err) res.error(err);
      else Voting_location.findLocationsNotWithSchedule(req.scheduleId, function(err, locsWithout) {
        if(err) res.error(err);
        else res.jsonp({
          withSchedule: locsWith,
          withoutSchedule: locsWithout
        });
      });
    })
  }
};
