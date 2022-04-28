const db = require('./models');
const databaseController = {};
databaseController.deleteReview = (req, res, next) => {
    console.log('this is the req.params object in the middleware', req.params);
    const query = `DELETE FROM reviews WHERE _id = '${req.params.id}' RETURNING *`
    db.query(query)
        .then((data) => {
            // console.log('this is the first promise data.rows[0] ',data.rows[0]["location_id"])
            res.locals.locationID = data.rows[0]["location_id"]
            // console.log('This is from the first promise in middle ware ', data);            
            return next()
        })
    // .then(db.query()) 
}
databaseController.getAdminLogin = (req, res, next) => {
    // const values = req.body.username
    // const values = [req.body.username]
    // const getAdminLogin = `SELECT USERNAME from ADMIN_LOGIN WHERE USERNAME = $1`
    
    const getAdminLogin = `SELECT USERNAME, PASSWORD from ADMIN_LOGIN WHERE USERNAME = '${req.body.username}'`
    db.query(getAdminLogin)
        // .then((data) => console.log('this is first in the promis chain', data.rows[0].password, req.body.password))
        .then((data) => {
            res.body = data;
            if (req.body.password === data.rows[0].password) {
                console.log('password valid')
                res.body.auth = true;
            } else {
                console.log('password invalid')
                res.body.auth = false
            }
            return next();
        })
        .catch(err => { 
        return next({
            log: `ERROR: apiController.getAllPins: ${err}`,
            message: 'Unable to load data for all locations. Check server logs'
        })
    })
}
databaseController.getReviews = (req, res, next) => {
    const locationID = parseInt(res.locals.locationID); 
    const getReviewsQuery = `SELECT * FROM reviews WHERE location_id=${locationID}`;
    db.query(getReviewsQuery)
      .then(result => {
        console.log('this is result.row in the first promise of getReviews', result.rows);
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
module.exports = databaseController;