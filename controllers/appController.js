require("dotenv").config();
const db = require("../models");
const axios = require("axios");
const binomialProbability = require("binomial-probability");
const moment = require("moment")

// Defining methods for the appController
module.exports = {
  findNearBy: async (req, res) => {
    let buses = await axios.get(`http://restbus.info/api/locations/${req.params.lat},${req.params.lon}/predictions`)
    console.log(req.params.lat, req.params.lon)
    res.json(buses.data)
  },
  findStops: (req, res) => {
    let route = req.params.route
    let direction = req.params.direction
    let stopId = req.params.id

    db.Stop.findAll({
        // include: [db.Route],
        where: {
          "$Route.route$": route,
          direction: direction
        },
        include: [db.Route]
      })
      .then(stops => {
        let stopList = stops.map(el => {
          let stop = {}
          stop.id = el.dataValues.tag
          stop.title = route + direction + " - " + el.Route.dataValues.routeTitle + " / " + el.dataValues.stopTitle

          return stop
        })

        let index = stopList.findIndex(el => el.id == stopId)
        let nextStops = stopList.slice(index + 1)
        res.json(nextStops)
      })
  },
  search: async (req, res) => {
    let route = req.params.route
    let origin = req.params.origin
    let destination = req.params.destination
    let terminal = req.params.terminal
    let previous = req.params.previous

    try {
      // For bus time
      let busData = await busTime(route, origin, destination, terminal, previous, res)

      // For latitude, longtitude data
      let originCoord = await findLatlon(origin)
      let destinationCoord = await findLatlon(destination)

      // For walk time
      let walkData = await walkTime(originCoord, destinationCoord)

      //Moment.js to capture the current day and time.
      let rightNow = moment().format(('h' + 'a'));
      console.log (rightNow)

      //Rush hour probability bionomial
      Math.random();
      let rushHour = 0;
      let rhp = Math.floor(Math.random()*9)+1;
      console.log('rhp'+ rhp)
      if (rightNow === '9am' || rightNow === '1pm' || rightNow === '5pm' || rightNow === '6pm' || rightNow === '7pm') {
      rushHour = Math.round(rhp * binomialProbability(10, rhp, 0.5) + Math.floor(Math.random())+1 + rushHour)
      console.log('rush hour' + rushHour)
      console.log('rhp'+ rhp)
      } else {
        rushHour = rushHour;
      }

      console.log(busData.eta + 'before')
      console.log('rushHour' + rushHour)
      console.log(busData.eta + 'middle')

      //bionomial
      Math.random();
      let s = Math.floor(Math.random()*9)+1;
      busData.eta = Math.round(busData.eta * binomialProbability(10, s, 0.5) + busData.eta) + rushHour;
      console.log(busData.eta + 'after')

      //Conditions array if/else for walk or wait determination
      const walkTimeCondition = walkData < 20;
      const busTimeCondition = busData.eta >= walkData;
      const busBunchCondition = busData.bunch;
      const noBusCondition = busData.eta === 999999 || busData.nextBus === 999999
      // returns string 'walk', 'wait', 'cab'
      const travelMode = getTravelMode(walkTimeCondition, busTimeCondition, busBunchCondition, noBusCondition)

      let walkOrWait = {
        bus: busData,
        walk: walkData,
        travelMode: travelMode
      }

      console.log(walkOrWait)
      res.json(walkOrWait)
    } catch (error) {
      res.json(error)
    }

  },

};

const busTime = async (route, origin, destination, terminal, previous, res) => {
  console.log(route, origin, destination, terminal, previous)

  let busTimes

  try {
    // Get bus time either at dstination or one stop before (previous) depending on it it is a terminal stop
    if (terminal === "true") {
      busTimes = await axios.get(`http://restbus.info/api/agencies/ttc/tuples/${route}:${origin},${route}:${previous}/predictions`)
    } else {
      busTimes = await axios.get(`http://restbus.info/api/agencies/ttc/tuples/${route}:${origin},${route}:${destination}/predictions`)
    }

  } catch (error) {
    return error
  }

  //Set variables
  let atOriginTime
  let nextVehicleId
  let index
  let destinationBusValues
  let atDestinationTime
  let bunch = false

  // If/Else statement depending on how many data point returns
  if (busTimes.data.length === 2) {
    console.log("busTimes.data.length === 2")
    atOriginTime = Math.round(busTimes.data[1].values[0].minutes)
    nextVehicleId = busTimes.data[1].values[0].vehicle.id
    console.log(busTimes.data[0].stop.id, busTimes.data[1].stop.id)

    if (terminal && origin === previous) {
      console.log("terminal && origin === previous")
      // this is the case if the origin is one stop before the terminal stop and the destination is the terminal
      atDestinationTime = atOriginTime
    } else {
      console.log("terminal === false or origin !== previous")
      // this is all other case weather if destination is terminal or not
      destinationBusValues = busTimes.data[0].values
      index = destinationBusValues.findIndex(bus => bus.vehicle.id === nextVehicleId)
      if (index === -1) {
        console.log("index === -1")
        // If for any reason why I cannot find the first bus to arrive at origin within destination data
        let lastBusTime = Math.round(busTimes.data[0].values[busTimes.data[0].values.length - 1].minutes)

        let secondLastBusTime
        if (busTimes.data[1].values.length >= 2) {
          console.log("busTimes.data[1].values.length >= 2")
          // If there are two or more bus arriving at destination
          secondLastBusTime = Math.round(busTimes.data[0].values[busTimes.data[1].values.length - 2].minutes)
        } else {
          console.log("only one bus at destination")
          // If there is only one bus arriving at destination
          secondLastBusTime = 0
        }

        atDestinationTime = atOriginTime + lastBusTime + (lastBusTime - secondLastBusTime)

        // Bus probably bunched if there are 4 or more buses scheduled to arrive at destination and none of which is the next bus to start at origin
        if (busTimes.data[0].values.length > 4 && index === -1) {
          console.log("if there are 4 or more buses at destination")
          bunch = true
        }

      } else {
        console.log("next bus found at destination")
        // Normal case where next bus to arrive at original is also found within destination data
        atDestinationTime = Math.round(busTimes.data[0].values[index].minutes)
      }
    }

    // Add two minutes for destination at terminal stuff to padd the eta to destination
    if (terminal === "true") {
      atDestinationTime += 2
    }

  } else if (busTimes.data.length === 1) {
    console.log('busTimes.data.length === 1')
    // this is the case when there is a bus prediction for either at origin or destination but not both
    //if origin only
    if (busTimes.data[0].stop.id === origin && origin !== previous) {
      atOriginTime = Math.round(busTimes.data[0].values[0].minutes)

      console.log("busTimes.data[0].stop.id === origin && origin !== previous")
      // check if bus arrive at previous
      let previousStop = await axios.get(`http://restbus.info/api/agencies/ttc/routes/${route}/stops/${previous}/predictions`)

      if (previousStop.data.length > 0) {
        console.log("previousStop.data.length > 0")
        destinationBusValues = previousStop.data[0].values
        index = destinationBusValues.findIndex(bus => bus.vehicle.id === nextVehicleId)

        if (index > -1) {
          console.log("index found at previous")
          // if yes it is previous time + 2
          atDestinationTime = Math.round(previousStop.data[0].values[index].minutes) + 2
        } else {
          console.log("bus not found in previous")
          atDestinationTime = 999999
        }

      } else {
        console.log("busTimes.data[0].stop.id === destination")
        atDestinationTime = 999999
      }

    } else {
      console.log("bus not at origin only destination")
      //if destination only
      // no more bus to arrive at origin
      atOriginTime = 999999
      atDestinationTime = 999999
    }

  } else {
    console.log("no bus at origin or destination")
    // this is the case when there are no bus predicted for origin or destination
    // set large number so time for bus should be much longer than any walk time
    atOriginTime = 999999
    atDestinationTime = 999999
  }

  //Returns times in minutes
  let busTimeData = {
    nextBus: atOriginTime, //change to 999999
    eta: atDestinationTime,
    bunch: bunch,
    noBus: false
  }

  return busTimeData

}

const findLatlon = async (stopId) => {
  let dbResult
  try {
    dbResult = await db.Stop.findOne({
      where: {
        tag: stopId
      }
    })
  } catch (error) {
    return error
  }

  let coord = dbResult.dataValues.latitude + "," + dbResult.dataValues.longitude

  return coord
}

const walkTime = async (originCoord, destinationCoord) => {
  let googleData
  try {
    googleData = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originCoord}&destinations=${destinationCoord}&mode=walking&key=${process.env.API_KEY}`)
  } catch (error) {
    return error
  }

  let walkTimeData = googleData.data.rows[0].elements[0].duration.text.split(" ")

  let walkData
  if (["hour", "hours", "hrs"].indexOf(walkTimeData[1]) > -1) {
    walkData = parseInt(walkTimeData[0]) * 60 + parseInt(walkTimeData[2])
  } else {
    walkData = parseInt(walkTimeData[0])
  }

  return walkData
}

// Decesion helper function, accepts 4 conditions
const getTravelMode = (a, b, c, d) => {

  const bus1 = a && !b && !c && !d
  const bus2 = !a && b && !c && !d
  const bus3 = !a && !b && !c && !d

  const cab1 = !a && b && c && d
  const cab2 = !a && b && c && !d
  const cab3 = !a && b && !c && d
  const cab4 = !a && !b && c && d
  const cab5 = !a && !b && c && !d
  const cab6 = !a && !b && !c && d

  const walk1 = a && b && c && d
  const walk2 = a && b && c && !d
  const walk3 = a && b && !c && d
  const walk4 = a && !b && c && d
  const walk5 = a && b && !c && !d
  const walk6 = a && !b && c && !d

  const shouldBus = bus1 || bus2 || bus3
  const shouldCab = cab1 || cab2 || cab3 || cab4 || cab5 || cab6
  const shouldWalk = walk1 || walk2 || walk3 || walk4 || walk5 || walk6

  let travelMode = '';

  if (shouldBus) {
    travelMode = 'wait'
  } else if (shouldCab) {
    travelMode = 'cab'
  } else if (shouldWalk) {
    travelMode = 'walk'
  }

  return travelMode // is a string

}

// s variable coefficiant used by binomial for rush hour
function coeff(n, k) {
  const n = 2;
  const k = 1;
  if ((typeof n !== 'number') || (typeof k !== 'number')) 
return false; 
 let coeff = 1;
 for (let x = n-k+1; x <= n; x++) coeff *= x;
 for (x = 1; x <= k; x++) coeff /= x;
 return coeff;
}
