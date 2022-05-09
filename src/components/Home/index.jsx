import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"
import axios from 'axios'

import UserContext from "../../contexts/UserContext"
import UrlContext from "../../contexts/UrlContext"

import logoutLogo from "../../Vector.svg"

const Home = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const { url } = useContext(UrlContext)
    const [wallet, setWallet] = useState(null)

    const formatLog = log => <div>
        <h6><small>{log.date}</small> {log.title}</h6>
        <p className={log.value >= 0 ? 'positive' : 'negative'}>{log.value >= 0 ? log.value : -log.value}</p>
    </div>

    const logout = () => {
        localStorage.setItem("user", JSON.stringify(null))
        setUser(null)
        navigate('/login')
    }

    useEffect(() => {
        axios
            .get(`${url}/${user.Id}`, {
                headers: {
                    Authorization: user.Authorization
                }
            })
            .then(({data}) => setWallet(data))
            .catch(response => alert(response))
    }, [])

    return <HomeContainer>
        <div>
            <h1>{`Olá, ${wallet?.name}`}</h1>
            <img alt="logout" src={logoutLogo} onClick={logout}></img>
        </div>
        <div className="frame">
            {wallet && wallet?.log.length !== 0 ? <>
                {wallet?.log.map(e => formatLog(e))}
                <div><p>Saldo</p><p>{wallet.value}</p></div>
            </> : 'Não há registros de entrada ou saída'}
        </div>
        <div>
            <Link to="/add">
                <button>+</button>
            </Link>
            <Link to="/subtract">
                <button>-</button>
            </Link>
        </div>
    </HomeContainer>
}

export default Home

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
        justify-content: start;
        align-items: center;
        flex-direction: column;
        padding: 23px 12px;
    }

    a {
        width: 326px;
    }

    small {
        color: #C6C6C6
    }

    .positive {
        color: #03AC00;
    }

    .negative {
        color: #C70000;
    }

    h1 {
        font-size: 26px;
        color: white;
        font-weight: 700;
    }

    button {
        background-color: #A328D6;
        font-weight: 700;
        color: white;
        height: 114px;
        width: 100%;
        border-radius: 5px;
        font-size: 20px;
        border: none;
    }
`