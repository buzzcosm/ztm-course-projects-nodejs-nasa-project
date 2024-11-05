// launches.controller.js
const { 
  getAllLaunches, 
  addNewLaunch 
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  // validation
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({ // client error - 400 Bad Request
      error: 'Missing required launch property',
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  // other validation approaches for the date
  // isNaN() -> returns true if the value is not a number
  // isNaN(launch.launchDate) -> returns true if the value is not a number
  // date.valueOf() -> returns the number of milliseconds since January 1, 1970
  // new Date().valueOf() -> returns the number of milliseconds since January 1, 1970
  // 
  // if (launch.launchDate.toString() === 'Invalid Date') {
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ // client error - 400 Bad Request
      error: 'Invalid launch date',
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch
}