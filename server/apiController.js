const db = require('./models');
const apiController = {};

apiController.getAllPins = (req, res, next) => {
  const getPinsQuery = 'SELECT * FROM location';
  db.query(getPinsQuery)
    .then(result => {
        // console.log(result.rows);
        res.locals.allPins = result.rows;
        return next();
    })
    .catch(err => { 
        return next({
            log: `ERROR: apiController.getAllPins: ${err}`,
            message: 'Unable to load data for all locations. Check server logs'
        })
    })
}

//SELECT market_id, AVG(rating), AVG(cost) GROUP BY market_id ricky suggestion for query
apiController.getReviewsAvg = (req, res, next) => { 
  // console.log(res.locals.allPins);
  const query = 'SELECT location_id, cost, rating FROM reviews';
  db.query(query)
    .then((data) => {
        // console.log('this is res.locals.allPIns', res.locals.allPins);
      const averages = {};
      // console.log('this is the first promise of data from all reviews ', data.rows);
      data.rows.forEach((object) => {
        if (!averages[object.location_id]) {
          averages[object.location_id] = {
            cost: object.cost.length,
            rating: object.rating,
            divisor: 1
          }
        } else {
          // console.log('this is divisor before increment', averages[object.location_id].divisor)
          ++averages[object.location_id].divisor
          // console.log('this is cost/divisor after increment', object.cost/averages[object.location_id].divisor)

          averages[object.location_id].cost += object.cost.length / averages[object.location_id].divisor;
          averages[object.location_id].rating += object.rating / averages[object.location_id].divisor;
        }
        // console.log('this is the averages object', averages);
      });
      res.locals.allPins.forEach((object) => {
        if (averages[object._id]) {
          object.averages = averages[object._id]
        }
        // console.log('this is afer adding averages to res.locals.allpins', res.locals.allPins)
      })
      return next();
    })
    .catch(err => { 
    return next({
        log: `ERROR: apiController.getReviewAvg: ${err}`,
        message: 'Unable to load data for all locations. Check server logs'
    })
})

}
// store query id into new variable 
// send back lat, long, clinic, id for each pin in locations table (array of objects)

// { "latitude": "50", "longitude": "39", "clinic": "codesmith", "newLocation": true }
apiController.createNewPin = (req, res, next) => {
    // req.body -> latitude, logitude, clinic, location_id
    const { latitude, longitude, clinic, location_id, address, contact } = req.body; 
    // error handling for empty fields 
    // if (String(latitude).length === 0 || 
    //     String(latitude) === 0 || 
    //     clinic.length === 0 ||
    //     service_type.length === 0 || 
    //     cost.length === 0 ||
    //     review.length === 0
    // ) {
    //     return next({
    //         log: 'ERROR: apiController.createNewPin: Required field not found',
    //         message: 'Required field not found in request body'
    //     })
    // }

    if (location_id !== null) {
        // console.log(typeof location_id)
        // console.log(location_id)
        // console.log('location id is not null')
        return next();
    }

    const values = [String(latitude), String(longitude), clinic, address, contact]; 
    const text = 'INSERT INTO location(latitude, longitude, clinic, address, contact) VALUES($1, $2, $3, $4, $5)';

    db.query(text, values)
      .then(() => {
        return next();
      })
      .catch(err => { 
          return next({
              log: `ERROR: apiController.createNewPin: ${err}`,
              message: 'Unable to POST a new location. Check server logs'
          })
      })
}

apiController.getPin = (req, res, next) => {
    const { latitude, longitude } = req.body; 
    const values = [String(latitude), String(longitude)];
    const text = `SELECT * FROM location WHERE latitude=$1 AND longitude=$2`;
    // const getNewPinQuery = `SELECT * FROM location WHERE latitude=${lat} AND longitude=${long}`;
    db.query(text, values)
      .then(result => {
          // console.log(result.rows);
          res.locals.newPin = result.rows[0];
          // to get reviews: 
          res.locals.locationID = result.rows[0]._id;
          return next();
      })
      .catch(err => { 
          return next({
              log: `ERROR: apiController.getPin: ${err}`,
              message: 'Unable to load data for specified location. Check server logs'
          })
      })
}

apiController.getReviews = (req, res, next) => {
    const locationID = parseInt(req.params.id); 
    const getReviewsQuery = `SELECT * FROM reviews WHERE location_id=${locationID}`;
    db.query(getReviewsQuery)
      .then(result => {
        // console.log(result.rows);
        res.locals.reviews = result.rows;
        return next();
      })
      .catch(err => {
        return next({
            log: `ERROR: apiController.getReviews: ${err}`,
            message: 'Unable to load data for reviews. Check server logs'
        })
      })
}
// store query id into new variable 
// query database for location_id 
// find reviews associated with location_id
// send all reviews from specified location_id as an array to client 

apiController.addReview = (req, res, next) => { 
    const { service_type, cost, rating, review } = req.body;
    const locationID = res.locals.locationID; 

    const values = [service_type, cost, rating, review, locationID]; 
    const text = 'INSERT INTO reviews (service_type, cost, rating, review, location_id) VALUES($1, $2, $3, $4, $5)';
    
    db.query(text, values)
      .then(result => {
        return next();
      })
      .catch(err => {
        return next({
            log: `ERROR: apiController.addReview: ${err}`,
            message: 'Unable to add new review. Check server logs'
        })
      })
}
// extract info from req.body and store into a new object using object deconstructing 
// query the location database using location id
    // if (err) return next(err)
    // if location id doesn't exist, create a new location 
        // add new location info to location table 
        // add new review and link location_id to that review
        // store review & location info to res.locals to send back to client 
        // return next()
    // if exists, then add new review and link existing location_id to that review
        // store review info to res.locals to send back to client 
        // return next()


module.exports = apiController;