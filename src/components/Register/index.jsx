import { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import UrlContext from "../../contexts/UrlContext"

import Form from '../Form'

const Register = () => {
    const navigate = useNavigate()
    const { url } = useContext(UrlContext)

    const submitFunc = data => {
        if(data?.confirm !== data?.password) {
            alert("As senhas não correspondem!")
            return
        }

        delete data?.confirm

        axios
            .post(`${url}/register`, data)
            .then(({data}) => {
                alert("Usuário registrado com sucesso!")
                navigate('/login')
            })
            .catch(response => {
                alert(response)
            }) 
    }

    const options = {
        list: [ 
            {title: 'Nome', value: 'name'},
            {title: 'Email', value: 'email'},
            {title: 'Senha', value: 'password'},
            {title: 'Confirme a senha', value: 'confirm'}
        ],
        submit: 'Cadastrar',
        link: {
            text: 'Já tem uma conta? Entre agora!',
            to: '/login'
        },
        submitFunc: submitFunc
    }

    return <Form opt={options} />
}

export default Register