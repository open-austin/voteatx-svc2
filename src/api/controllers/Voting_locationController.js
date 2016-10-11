/**
 * Voting_locationController
 *
 * @description :: Server-side logic for managing voting_locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function(req, res) {
		console.log("searching");
		Voting_location.findNearby(parseFloat(req.query.longitude), parseFloat(req.query.latitude), 1, (err, locs) => {
			if(err !== undefined) {
				res.jsonp(
					{
						places: enrichLocations(locs),
						additional:{
							sample_ballot_url:"http://www.traviscountyclerk.org/eclerk/content/images/ballots/GR14/275A.pdf"
						}
					}
				);
			} else {
				console.log("error: ", err);
				res.error(err);
			}
		});
	},
	reportLongLine: function(req, res) {
		console.log("Long line report data: ", req.params);
		LineReport.reportLongLine(req.ip, req.params.locationId, function(err, report) {
			if(err) res.json(err);
			else res.jsonp(report);
		})
	}
};

function enrichLocations(locations) {
	var betterLocations = [];
	for(var loc of locations) {
		betterLocations.push({
			id: loc.id, // TODO
			type: "ELECTION_DAY", // TODO
			location: {
				name: loc.location_name,
				address: loc.address,
				city: "Austin", // TODO
				state: "TX", // TODO
				latitude: loc.location.coordinates[1],
				longitude: loc.location.coordinates[0]
			},
			rawLoc: loc,
			is_open: true, // TODO
			info: loc.address // TODO
		})
	}
	return betterLocations;
}
