module.exports = {
  reportLongLine: function(req, res) {
    console.log("ip: ", req.ip);
    LineReport.create({
      id: req.ip,
      reported_time: new Date()
    }).exec(function(err, report) {
      if(err) res.json(err);
      else res.jsonp(report);
    })
  }
}
