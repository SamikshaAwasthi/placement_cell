const pool = require("../db/dbconnection");
async function insert(table, data) {
  try {

    const keys = Object.keys(data)
    const values = Object.values(data)

    const columns = keys.join(",")
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(",")

    const query = `
      INSERT INTO ${table} (${columns})
      VALUES (${placeholders})
      RETURNING *
    `

    const result = await pool.query(query, values)

    return result.rows[0]

  } catch (error) {
    console.error("Insert Error:", error.message)
    throw error
  }
}


// select query...
async function selectquery(feild, table, whereclause = [], orderby = "") {

  let query = `SELECT ${feild.join(',')} FROM ${table}`

  if (whereclause.length > 0) {

    let conditions = whereclause.map((element) => {

      let field = element.feild.trim()
      let value = element.value
      let type = element.type?.toUpperCase()

      switch (type) {

        case 'IN':
          return `${field} IN ('${value.join("','")}')`

        case 'NOT IN':
          return `${field} NOT IN ('${value.join("','")}')`

        case 'LT':
          return `${field} < ${value}`

        case 'GT':
          return `${field} > ${value}`

        case 'LTE':
          return `${field} <= ${value}`

        case 'GTE':
          return `${field} >= ${value}`

        case 'LIKE':
          return `${field} LIKE '%${value}%'`

        case 'ILIKE':
          return `${field} ILIKE '%${value}%'`

        default:
          return typeof value === "number"
            ? `${field} = ${value}`
            : `${field} = '${value}'`
      }

    })

    query += ` WHERE ${conditions.join(' AND ')}`
  }

  if (orderby) {
    query += ` ${orderby}`
  }

  return query
}



module.exports = {insert,selectquery}