
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

app.get("/coins/:id", (req, res) => {
    const id = +req.params.id;
    console.log('id: ', id)
    connection.query(`SELECT * FROM coins
    JOIN coin_details ON coins.id = coin_details.id
    WHERE coins.id = ${id}
    ;`, (err, coin_details) => {
        if (!err) {

            // get coin paragraphs
            connection.query(`SELECT * FROM coin_paragraphs WHERE coin_paragraphs.coin_id = ${id};`, (err, coin_paragraphs) => {
                if (!err) {
                    console.log('data joined: ', coin_details.concat(coin_paragraphs))
                    res.json({
                        coin_metadata: coin_details[0],
                        coin_paragraphs
                    })
                }
            })
        } else {
            console.log('error: ', err)
            res.status(500).json()
    
        }
    })
})

app.get('/listOfCoins', (req, res) => {
    // ?country=Canadian&metal=Nickel&sdfsd=fsdfsd
    const searchQuery = req.query;
    const searchQueryArr = []
    if (searchQuery.country) {
        searchQueryArr.push(`issuing_country LIKE '%${searchQuery.country}%'`)
    }
    if (searchQuery.search) {
        searchQueryArr.push(`(title LIKE '%${searchQuery.search}%' OR short_desc LIKE '%${searchQuery.search}%')`)
    }
    if (searchQuery.metal) {
        searchQueryArr.push(`composition LIKE '%${searchQuery.metal}%'`)
    }
    if (searchQuery.quality) {
        searchQueryArr.push(`quality LIKE '%${searchQuery.quality}%'`)
    }
    if (searchQuery.fromPrice) {
        searchQueryArr.push(`price > '${searchQuery.fromPrice}'`)
    }
    if (searchQuery.toPrice) {
        searchQueryArr.push(`price < '${searchQuery.toPrice}'`)
    }
    if (searchQuery.fromYear) {
        searchQueryArr.push(`year > '${searchQuery.fromYear}'`)
    }
    if (searchQuery.toYear) {
        searchQueryArr.push(`year < '${searchQuery.toYear}'`)
    }
    
    const finalQuery = searchQueryArr.join(' AND ')

    const sqlQuery = `SELECT * FROM coins
    JOIN coin_details ON coin_details.coin_id = coins.id
    WHERE ${finalQuery};`

    console.log('sqlQuery: ', sqlQuery)
    connection.query(sqlQuery, (err, data) => {
        if (!err) {
            res.json(data)
        } else {
            res.status(500).send()
            console.log(err)
        }

    })
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    console.log('req body: ', req.body)
    connection.query(`SELECT * FROM users WHERE email = '${email}';`, (err, data) => {
        if (err || data.length === 0) {
            console.log('error: ', err)
            res.status(404).send()
        } else {
            if (data) {
                const adminUser = data[0]
                if (adminUser.password === password) {
                    res.json({
                        isAdmin: true
                    })
                } else {
                    res.status(401).json({
                        authError: 'Invalid password'
                    })
                }

            }
        }
    })
})

app.post('/admin/add', (req, res) => {
    const { name, year_of_issue, search, country, metal, short_desc, quality, weight, front_image, reverse_image, category_id } = req.body
    const query1 = `INSERT INTO coins (title, short_desc, image, category_id) VALUES ('${name}', '${short_desc}', '${front_image}', '${category_id}');`
    const query2 = `INSERT INTO coins (title, short_desc, image, category_id) VALUES ('${name}', '${short_desc}', '${front_image}', '${category_id}');`

    console.log('query: ', query1)
    connection.query(query1, (err, data) => {
        if (err) {
            console.log('error in post: ', err)
            res.send()
        }
        else {
            res.json(data)
        }
    })
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