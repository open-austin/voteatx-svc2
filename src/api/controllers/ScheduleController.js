
module.exports = {
  locationsList: function(req, res) {
    console.log("getting list", req.params);
    Voting_location.findLocationsBySchedule(req.params.scheduleId, function(err, locs) {
      if(err) res.error(err);
      else res.jsonp(locs);
    })
  }
};
