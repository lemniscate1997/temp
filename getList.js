const express = require('express')
const router = express.Router()
const connectionString = 'postgresql://postgres:argusadmin@192.1.200.74:5432/empdb'
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: connectionString
})

const getMappingDetails = (request, response, next) => {
    // pageIndex and pageSize need to be pass in the body and session_id in parameters
    pool.query(`select template_name, reviewer_name, reviewee_name from session_template_mapping natural join  
    (select t_id as template_id, t_name as template_name from template) template natural join
    (select user_id as reviewer_id, concat(first_name,' ',last_name) as reviewer_name from system_user_detail ) reviewer natural join
    (select user_id as reviewee_id, concat(first_name,' ',last_name) as reviewee_name from system_user_detail) reviewee where session_id=$1 limit $2 offset ($3-1)*$2`, [request.params.id, request.body.pageSize, request.body.pageIndex], (err, results) => {
        if (err) {
            throw err
        }

        response.status(200).json(results.rows)
    })
}

router.get('/:id', getMappingDetails)
module.exports = router

// older query of empdb 
// select template_name, reviewer_name, reviewee_name from session_template_mapping natural join  
//     (select t_id as template_id, t_name as template_name from template) template natural join
//     (select user_id as reviewer_id, concat(first_name,' ',last_name) as reviewer_name from system_user_detail ) reviewer natural join
//     (select user_id as reviewee_id, concat(first_name,' ',last_name) as reviewee_name from system_user_detail) reviewee where session_id=$1