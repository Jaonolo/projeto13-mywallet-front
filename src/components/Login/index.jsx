import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import Form from '../Form'

import UserContext from "../../contexts/UserContext"
import UrlContext from "../../contexts/UrlContext"

const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)

    const submitFunc = data => {
        axios
            .post(`${url}/login`, data)
            .then(({data}) => {
                const user = { ...data }
                setUser(user)
                localStorage.setItem("user", JSON.stringify(user))
                navigate('/')
            })
            .catch(response => {
                alert(response)
            }) 
    }

    const options = {
        list: [{title: 'Email', value: 'email'}, {title: 'Senha', value: 'password'}],
        submit: 'Entrar',
        link: {
            text: 'Primeira vez? Cadastre-se!',
            to: '/register'
        },
        submitFunc: submitFunc
    }

    return <Form opt={options} />
}

export default Login