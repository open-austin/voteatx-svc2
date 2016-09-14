#!/usr/bin/env node

var fs = require('fs');
var YAML = require('yamljs');
var parse = require('csv-parse/lib/sync');
var format = require('string-template');
var request = require('request');

var parser = parse({columns: true});
// TODO make this dynamic for all folders in data
var fileName = './data/2016_08/TX_p2016_EDVoteCentersv2.csv'
var fileStream = fs.createReadStream(fileName);
var fileContents = fs.readFileSync(fileName, 'utf8');
var config = YAML.load('./data/2016_08/config.yml').columnMap;

var records = parse(fileContents, {columns:true});

function saveItem(elem) {

  var location = {
    address: format(config.address, elem),
    location: {
      type: 'Point',
      coordinates: [
        parseFloat(format(config.location.longitude, elem)),
        parseFloat(format(config.location.latitude, elem))
      ],
    },
    county_name: format(config.county_name, elem),
    location_name: format(config.location_name, elem)
  };

  request(
    {
      method: 'POST',
      uri: 'http://localhost:1337/voting_location',
      body: location,
      json: true
    },
    (err, res, body) => {
      if(res !== undefined) {
        var code = res.statusCode;
        switch(code) {
          case 200:
          case 201:
            break;// do nothing, assume that everythign is a success
          case 400:
            console.log(res);
            break;
          case 500:
            if(body.originalError.errmsg.indexOf('dup key') < 0) {
              console.log("500: ", body.originalError.errmsg);
            }
            break;
          default:
            console.log(`Unknown error occurred with status ${code}:\n`, body);
            break;
        }
      } else {
        console.log(`res was undefined for location ${JSON.stringify(elem)}n\t`, err, body, "\n\n");
      }
    }
  );
}

records.forEach(saveItem);
