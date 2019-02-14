const express = require('express');
const router = express.Router();

const pool = require('../query');



let get_session = (req, res, next) => {                        //function to list all sessions
    
    // query giving the list of sessions based on the pagesize and pageindex provided by user in angular

    pool.query('SELECT s_id,s_name,created_at,s_ending_date,s_status,s_templates FROM session ORDER BY s_id LIMIT $1 OFFSET ($2 - 1) * $1', [req.query.pagesize,req.query.pageindex],
    (error, results) => {
        if (error) {
          throw error
        }
       
        res.status(200).json(results.rows);
        res.end();
    })
}

let total_session = (req, res, next) => {                        //function to list all sessions
    
  pool.query('SELECT COUNT(s_id) as total FROM session',
  (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows[0]);
      res.end();
  })
}

router.get('/', get_session);
router.get('/total-sessions', total_session);


module.exports = router;
