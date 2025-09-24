const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())


app.listen(3000, () => {
    console.log("Servidor rodando na porta http://localhost:3000")
})

const alunosRouter = require('./routes/alunos')