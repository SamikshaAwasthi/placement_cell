const pool = require("../db/dbconnection");

  async function insert(table,data){
    try {
      const keys = Object.keys(data);
      console.log(keys);

      const values = Object.values(data);
      console.log(values);

      const columns = keys.join(',')

      const placeholder = keys.map((_,i)=> `$${i+1}`).join(",")

      const query = `INSERT INTO ${table} (${columns})
      VALUES (${placeholder}) RETURNING *`

      const result = await pool.query(query,values)

      return result.rows[0]
      
    } catch (error) {
        console.error("Insert Error:", error.message)
    throw error
    }
}


// select query...





module.exports = {insert}