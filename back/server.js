
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
                res.json(data)
            } else {
                res.status(500).json()
            }
        }
    )
})

app.get("/coins/:id", (req, res) => {
    const id = +req.params.id;
    connection.query(`SELECT * FROM coins
    JOIN coin_details ON coins.id = coin_details.coin_id
    WHERE coins.id = ${id}
    ;`, (err, coin_details) => {
        if (!err) {
            // get coin paragraphs
            connection.query(`SELECT * FROM coin_paragraphs WHERE coin_paragraphs.coin_id = ${id};`, (err, coin_paragraphs) => {
                if (!err) {
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

    const sqlQuery = `SELECT coins.id,  coins.title, coins.short_desc, coins.image, coins.category_id FROM coins
    JOIN coin_details ON coin_details.coin_id = coins.id
    WHERE ${finalQuery};`

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
    const { name, year_of_issue, face_value, country, metal, short_desc, quality, weight, front_image, reverse_image, category_id, price } = req.body
    const query1 = `INSERT INTO coins (title, short_desc, image, category_id) VALUES ('${name}', '${short_desc}', '${front_image}', '${category_id}');`

    connection.query(query1, (err, data) => {
        if (err) {
            console.log('error in post: ', err)
            res.send()
        }
        else {
            const {insertId} = data

            const query2 = `INSERT INTO coin_details (coin_id, issuing_country, composition, quality, denomination, year, weight, price, back_image) VALUES ('${insertId}', '${country}', '${metal}', '${quality}', '${face_value}', '${year_of_issue}', '${weight}', '${price}', '${reverse_image}');`

            connection.query(query2, (err, data) => {
                if (!err) {
                    res.json({success: true})
                } else {
                    console.log('error in coin_details: ', err)
                }
            })
        }
    })
})


app.put('/admin/edit/:id', (req, res) => {
    const id = +req.params.id
    const { simpleData, detailedData } = req.body;

    if (simpleData) {
        const columns = Object.keys(simpleData);
        const updateString = columns.map((column) => `${column} = ?`).join(', ');
        //   'title = Lonney-2?, short_desc = 'fsdfsdf'?'
        const query = `UPDATE coins SET ${updateString} WHERE id = ?`;

        const values = [...Object.values(simpleData), id];

        connection.query(query, values, (err, res) => {
            if (err) {
                console.log('err in edit: ', err)
            } else {
                console.log('success edit')
            }
        })
    }

    if (detailedData) {
        const columns = Object.keys(detailedData);
        const updateString = columns.map((column) => `${column} = ?`).join(', ');
        //   'title = Lonney-2?, short_desc = 'fsdfsdf'?'
        const query = `UPDATE coin_details SET ${updateString} WHERE id = ?`;

        const values = [...Object.values(detailedData), id];

        connection.query(query, values, (err, res) => {
            if (err) {
                console.log('err in edit: ', err)
            } else {
                console.log('success edit')
            }
        })
    }


    // const query1 = `INSERT INTO coins (title, short_desc, image, category_id) VALUES ('${name}', '${short_desc}', '${front_image}', '${category_id}');`

    
})



app.get('/countries', (req, res) => {
    const query = 'SELECT DISTINCT issuing_country FROM coin_details;'
    connection.query(query, (err, data) => {
        if (!err) {
            res.json(data)
        } else {
            res.status(500).send()
        }
    })
})
app.get('/composition', (req, res) => {
    const query = 'SELECT DISTINCT composition FROM coin_details;'
    connection.query(query, (err, data) => {
        if (!err) {
            res.json(data)
        } else {
            res.status(500).send()
        }
    })
})

app.get('/qualities', (req, res) => {
    const query = 'SELECT DISTINCT quality FROM coin_details;'
    connection.query(query, (err, data) => {
        if (!err) {
            res.json(data)
        } else {
            res.status(500).send()
        }
    })
})

app.delete('/coin/:id', (req, res) => {
    const  id  = +req.params.id;
    
    connection.query(`DELETE FROM coin_details WHERE coin_id = '${id}'`, (errDetails, data) => {
        if (!errDetails) {
            connection.query(`DELETE FROM coins WHERE id = '${id}';`, (errCoin, data) => {
                if (!errCoin) {
                    res.json({deleted: true})
                } else {
                    console.log('error in delete coin detail: ', errCoin)
                }
            })
        } else {
            console.log('error in coin errDetails delete: ', errDetails)
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