const express = require('express')
const mongoose = require('mongoose')
const { registerUser, authenticateUser } = require('./logic')
const { DuplicityError, FormatError } = require('./errors')

const api = express()

const jsonBodyParser = express.json() // ... const body = JSON.parse(json) -> req.body = body

const mongoUrl = 'mongodb://127.0.0.1:27017/postits'

    ; (async () => {
        await mongoose.connect(mongoUrl)

        console.log(`DBconnected on ${mongoUrl}`)

        api.post('/api/users', jsonBodyParser, (req, res) => {
            try {
                const { body: { name, email, password } } = req

                registerUser(name, email, password, (error) => {
                    if (error) {
                        if (error instanceof DuplicityError)
                            res.status(409).json({ error: error.message })
                        else
                            res.status(500).json({ error: error.message })

                        return
                    }

                    res.status(201).send()
                })
            } catch (error) {
                if (error instanceof TypeError || error instanceof FormatError)
                    res.status(400).json({ error: error.message })
                else
                    res.status(500).json({ error: error.message })
            }
        })


        api.post('/api/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { body: { email, password } } = req

                authenticateUser(email, password, (error, userId) => {
                    if (error) {
                        if (error instanceof AuthError)
                            res.status(401).json({ error: error.message })
                        else
                            res.status(500).json({ error: error.message })

                        return
                    }
                    res.status(200).json({ userId })
                })
            } catch (error) {
                if (error instanceof TypeError || error instanceof FormatError)
                    res.status(400).json({ error: error.message })
                else
                    res.status(500).json({ error: error.message })
            }
        })

        api.listen(8080, () => console.log('api started'))

        process.on('SIGINT', async () => { //sigint = control+C
            await disconnect()

            console.log('DB disonnected')

            process.exit(0)
            
        })
    })()

// function writeUser({ name, email, password }, callback) {
//     const newUser = {
//         id: `user-${Math.round(Math.random() * Date.now())}`,
//         name,
//         email,
//         password,
//     }

//     const newJson = JSON.stringify(newUser);

//     writeFile(`./data/users/${newUser.id}.json`, newJson, "utf8", (error) => {
//         if (error) {
//             callback(error)
//             return
//         }

//         callback(null)
//     })
// }