var express = require('express');
var mysql = require('mysql');
var cors = require('cors')
const { response } = require('express');
var app = express();


var connection = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'sammy',
    password: 'password',
    database: 'Stock'
});
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
app.listen(1337);