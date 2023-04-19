
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

const PORT = 3001;


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'test',
  database: 'final_project'
});

connection.connect((err) => {
    if (!err) {
        console.log('connected to database')
    } else {
        console.log('error', err)
    }
})


app.get('/' , (req, res) => {
    res.send('From Home Page')
})

app.get('/categories', (req, res) => {
    connection.query(
        "SELECT * FROM categories", (err, data) => {
            res.json(data)
        }
    )
})

app.get('/categories/:id', (req, res) => {
    const id = +req.params.id;

    connection.query(
        `SELECT * FROM coins WHERE category_id = ${id}`, (err, data) => {
            if (!err) {
                console.log("data: ", data)
                res.json(data)
            } else {
                res.status(500).json()
            }
        }
    )
})

app.listen(PORT, () => {
    console.log('listening to port: ', PORT)
})













// const fs = require('fs')

// fs.readFile('./data.json', 'utf-8', (err, data) => {
//     if (!err) {
//         console.log('data: ', data)
//         fs.writeFile("result2.txt", JSON.stringify(data), (err) => err && console.error(err));
//         // fs.writeFileSync("result.txt", JSON.stringify(data));
//     } else {
//         console.log('error: ', err)
//     }
// })