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

//select query All data Wtih Join 

// async function selectAllWtihJoin(feild, table, joins, whereclause = [], orderby = "", limit) {
//   let query = `SELECT ${feild.join(',')} FROM ${table}`

//   console.log(query);

//   if (joins != undefined && joins > 0) {
//     joins.forEach(join => {
//       let jointype = join.type || "INNER"
//       query += `${jointype} join ${join.table} ON ${join.on}`
//     });
//   }

//   // for where

// }


function fetchAllWithJoinQry(fieldsArray, tableName, joins,
  WhereClouse, offset, limit, orderBy) {
  const fields = fieldsArray.toString();
  var sql = `SELECT ${fields} FROM ${process.env.TABLE_SCHEMA_NAME}.${tableName}`;
  var joinString = ``;
  if (joins != undefined && joins.length > 0) {
    joins.forEach(async element => {
      joinString += ` ${element.type} JOIN
${process.env.TABLE_SCHEMA_NAME}.${element.table_name} ON
${element.p_table_field} = ${element.s_table_field}`;
    });
    sql += joinString;
  }

  if (WhereClouse != undefined && WhereClouse.length > 0) {
    sql += ` where`;
    var couter = 0;
    WhereClouse.forEach(element => {
      if (couter > 0) {
        sql += ` and`;
      }
      if (element.type != undefined && element.type != '') {
        switch (element.type) {
          case 'IN':
            teamsMemString = element.fieldValue.join("','");
            sql += ` ${element.fieldName} IN ('${teamsMemString}')`;
            break;
          case 'LIKE':
            sql += ` ${element.fieldName} LIKE '%${element.fieldValue}%'`;
            break;
          case 'GTE':
            sql += ` ${element.fieldName} >= '${element.fieldValue}'`;
            break;
          case 'GT':
            sql += ` ${element.fieldName} > '${element.fieldValue}'`;
            break;
          case 'LT':
            sql += ` ${element.fieldName} < '${element.fieldValue}'`;
            break;
          case 'LTE':
            sql += ` ${element.fieldName} <= '${element.fieldValue}'`;
            break;
          case 'BETWEEN':
            sql += ` ${element.fieldName} BETWEEN ${element.fieldValue}`;
            break;
          case 'NOTNULL':
            sql += ` ${element.fieldName} is not null `;
            break;

        }
      } else {
        sql += ` ${element.fieldName}='${element.fieldValue}'`;
      }
      couter++;
    });
  }
  if (orderBy != undefined && orderBy != '') {
    sql += ` ${orderBy}`;
  }
  if (offset != undefined && validator.isInt(offset, { min: 0, max: 9999999999999 })) {
    sql += ` offset ${offset}`;
  }
  if (limit != undefined && validator.isInt(limit, { min: 0, max: 1000 })) {
    sql += ` limit ${limit}`;
  }
  return sql;
}


module.exports = { insert, selectquery,fetchAllWithJoinQry }