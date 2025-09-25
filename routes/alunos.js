const express = require('express')
const router = express.Router()

let listaalunos = [
    {
id: 1,
nome: "Kauã Henrique",
email: "Kaua@gmail.com",
cpf: "012345678912",
telefone: "61 985443250",
dataNascimento: "06/07/2005"

    },
      {
id: 2,
nome: "Miguel pedro",
email: "Miguel@gmail.com",
cpf: "012345688912",
telefone: "61 9877443250",
dataNascimento: "01/05/2001"

    },
]
router.get('/alunos',(req , res , next) => {
    res.json(listaalunos)
})

router.get('/alunos/:id',(req, res, next) => {
    const id = req.params.id
    const alunos = listaalunos.find(alunos => alunos.id =id)

    if(!alunos){
        return res.status(404).json({error: "Aluno não encontrado!!!"})
    }
    res.json(alunos)
})

router.post("/alunos", (req, res, next) =>{
    const {nome, email, cpf, dataNascimento, telefone} = req.body
    if(!nome || !email || !cpf || !dataNascimento  ||  !telefone  ){
        return res.status(400).json({ error: "Nome, cpf email e dataNascimento e telefone são obrigatorios"})
    }

if (listaalunos.some(alunos => alunos.cpf == cpf)){
    return res.status(400).json({ error: "CPF já cadastado!!!"})
}
const novoalunos = {
    id: Date.now(),
    nome,
    cpf,
    email,
    dataNascimento,
    telefone,
}

listaalunos.push(novoalunos)
res.status(201).json({ message: "Aluno cadastrado com Sucesso", novoalunos})
})

router.put("/alunos/:id", (req, res, next) =>{
    const id = req.params.id
    const alunos = listaalunos.find(alunos => alunos.id == id)
    
    if(!alunos){
        return res.status(404).json({ error: "Nenhum Aluno encontrado"})
    }
    const { nome, email, dataNascimento, telefone } = req.body

    if (!nome || !email || !cpf || !dataNascimento  ||  !telefone  ){
        return res.status(400).json({ error: "Nome, email, data de nascimento e telefone são obrigatorios!!"})

    }
    alunos.nome = nome
    alunos.email = email
    alunos.telefone = telefone
    alunos.dataNascimento = dataNascimento

    res.json({ message: "Aluno cadastrado com sucessor", alunos})

})
router.delete("/alunos/:id", (req, res, next ) => {
    const id = req.params.id
const pessoa = listaalunos.find(alunos => alunos.id == id)

if(!pessoa) {
    return res.status(404).json({ error: "ID associado ao aluno não encontrado!!!"})
}
listaalunos = listaalunos.filter(alunos => alunos.id !=id)
res.status(200).json({ error: "Id excluido com sucessos"})

})


module.exports = router