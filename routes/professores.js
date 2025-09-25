const express = require('express')
const router = express.Router()


let listaProfessores = [
    {
        id: 1,
        nome: "Ana",
        email: "analaura@iesb.edu",
        cpf: "100.483.281-89",
        curso: "Progrmação",
        disciplina: "Análise e Desenvovilmento de Sistemas"

    },
    {
        id: 2,
        nome: "João",
        email: "jão@iesb.edu",
        cpf: "100.483.283-89",
        curso: "Direito",
        disciplina: "Análise e Desenvovilmento de Sistemas"

    }
]

router.get('/professor/:id', (req, res, next) => {
    const id = req.params.id
    const professor = listaProfessores.find(professor => professor.id == id)

    if (!professor){
        return res.status(404).json({ error: "Professor não encontrado!!!" })
    }
    res.json(professor)
})

router.post("/professor", (req, res, next) => {
    const {nome, email, cpf, curso, disciplina} = req.body
    
    if (!nome || !email || !cpf || !curso|| !disciplina){
        return res.status(404).json({error: "Nome, cpf, email, curso ou disciplina não encontrado!!"})
    }

    //validar

    if (listaProfessores.some(professor => professor.cpf == cpf)) {
        return res.status(404).json({ error: "Cpf não encontrado!" })
    }
    const novaProfessor = {
        id: Date.now(),
        nome,
        email,
        cpf,
        curso,
        disciplina
    }

    listaProfessores.push(novaProfessor)
    res.status(201).json({ message: "Professor cadastrado com sucesso! ", novaProfessor})
})

router.put("/professor/:id", (req, res, next) => {
    const id = req.params.id
    const professor = listaProfessores.find(professor => professor.id == id)

    if (!professor) {
        return res.status(404).json({ error: "Nenhum professor encontrado!" })
    }
    const {nome, email, curso, disciplina} = req.body
    
    if (!nome || !email || !curso || !disciplina) {
        return res.status(404).json({ error: "nome, email, curso e disciplina são obrigatórios!"})
    }

    professor.nome = nome
    professor.email = email
    professor.curso = curso
    professor.disciplina = disciplina

    res.json({ message: "Professor atualizado com sucesso!", professor })

})

router.delete("/professor/:id", (req, res, next) => {
    const id = res.params.id
    const professor = listaProfessores.find(professor => professor.id == id)

    if (!professor) {
        return res.status(404).json({ error: "ID associada a professor não encontrado!"})
    }
    listaProfessores = listaProfessores.filter(professor => professor.id != id)
    res.status(404).json({ error: "ID excluído com sucesso"})
})
module.exports = router