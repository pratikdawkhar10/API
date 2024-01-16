var config = require('./dbconfig');
const sql = require('mssql');

async function getorders() {
  try{
    let pool = await  sql.connect(config);
    let products = await pool.request().query("SELECT * FROM orders");
    return products.recordsets;
  }
  catch (error){
    console.log(error);
  }
}

async function getOrder(orderId) {
  try {
      let pool = await sql.connect(config);
      let product = await pool.request()
          .input('input_parameter', sql.Int, orderId)
          .query("SELECT * from Orders where Id = @input_parameter");
      return product.recordsets;

  }
  catch (error) {
      console.log(error);
  }
}

async function addOrder(order) {

  try {
      let pool = await sql.connect(config);
      let insertProduct = await pool.request()
          .input('SP_Id', sql.Int, order.Id)
          .input('SP_Title', sql.NVarChar, order.Title)
          .input('SP_Quantity', sql.Int, order.Quantity)
          .input('SP_City', sql.NVarChar, order.City)
          .execute('InsertOrders');
      return insertProduct.recordsets;
  }
  catch (err) {
      console.log(err);
  }

}

module.exports ={
  getorders : getorders,
  getOrder : getOrder,
  addOrder : addOrder
}