import styled from "styled-components"
import { useContext } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import UserContext from "../../contexts/UserContext"
import UrlContext from "../../contexts/UrlContext"
import Form from "../Form"

const Add = ({ signal }) => {
    const { user } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const navigate = useNavigate()

    const submitFunc = data => {
        const newData = {...data, value: signal*data.value}

        axios
            .post(`${url}/${user.Id}`, newData, {
                headers: {
                    Authorization: user.Authorization
                }
            })
            .then(({data}) => {
                navigate('/')
            })
            .catch(response => {
                alert(response)
            }) 
    }

    const options = {
        list: [{title: 'Valor', value: 'value'}, {title: 'Descrição', value: 'title'}],
        submit: `Salvar ${signal >= 0 ? 'Entrada' : 'Saída'}`,
        link: {
            text: 'Primeira vez? Cadastre-se!',
            to: '/register'
        },
        complete: false,
        submitFunc: submitFunc
    }

    return <HomeContainer>
        <div>
            <h1>{`Olá, ${user.name}`}</h1>
        </div>
        <Form opt={options} />
    </HomeContainer>
}

export default Add

const HomeContainer = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
    width: 326px;

    div {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 15px
    }

    .frame {
        background-color: white;
        height: 446px;
        border-radius: 5px;
    }
`