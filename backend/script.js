var express = require('express');
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser');
const { response } = require('express');
var app = express();

var connection = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 50,
    host: 'localhost',
    user: 'sammy',
    password: 'password',
    database: 'Stock'
});
app.use(bodyParser.json());
app.use(cors());
app.get('/getProducts', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Successful execution');
            tempCont.query("SELECT * FROM Product", function (error, rows, fields) {
                tempCont.release();
                if (!!error) {
                    console.log('Error');
                } else {
                    resp.json(rows);
                }
            });
        }
    });
});
app.get('/getWarehouses', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Successful execution');
            tempCont.query("SELECT * FROM Warehouse", function (error, rows, fields) {
                tempCont.release();
                if (!!error) {
                    console.log('Error');
                } else {
                    resp.json(rows);
                }
            });
        }
    });
});
app.get('/getStock', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log('Successful execution');
            tempCont.query("SELECT * FROM ProductStock s INNER JOIN Product p ON s.SKU_CODE = p.SKU_CODE", function (error, rows, fields) {
                tempCont.release();
                if (!!error) {
                    console.log('Error');
                } else {
                    resp.json(rows);
                }
            });
        }
    });
});
app.post('/setProductInfo', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log(req);
            tempCont.query(`UPDATE ProductStock SET ITEM_COUNT=${req.body.ITEM_COUNT}, LOW_ITEM_THRESHOLD=${req.body.LOW_ITEM_THRESHOLD} WHERE SKU_CODE='${req.body.SKU_CODE}'`, function (error, rows, fields) {
                tempCont.release();
                if (!!error) {
                    console.log(error);
                } else {
                    resp.json({ success: true });
                }
            });
        }
    });
});
app.post('/createWarehouse', function (req, resp) {
    connection.getConnection(function (error, tempCont) {
        if (!!error) {
            tempCont.release();
            console.log('Error');
        } else {
            console.log(req);
            tempCont.query(createQuery(req), function (error, rows, fields) {
                tempCont.release();
                if (!!error) {
                    console.log(error);
                } else {
                    resp.json({ success: true });
                }
            });
        }
    });
});
function createQuery(req) {
    var query = `INSERT INTO Warehouse (WH_CODE, MAX_CAPACITY, NAME, PINCODE) VALUES ('${req.body.WH_CODE}', '${req.body.MAX_CAPACITY}', '${req.body.NAME}', '${req.body.PINCODE}');`;
    req.body.products.forEach(product => {
        query += `INSERT INTO ProductStock (SKU_CODE, WH_CODE, ITEM_COUNT, LOW_ITEM_THRESHOLD) VALUES ('${product.SKU_CODE}', '${req.body.WH_CODE}', '0', '10');`;
    });
    return query;
}
app.listen(1337);