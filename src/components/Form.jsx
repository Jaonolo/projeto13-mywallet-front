import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Form = ({ opt }) => {
    const [data, setData] = useState(null)

    const handleSubmit = event => {
        opt.submitFunc(data)
        event.preventDefault()
    }

    const changeData = (value, a) => {
        const newData = {...data}
        newData[a] = value
        setData(newData)
    }
    
    let complete = opt.complete
    if (complete !== false)
        complete = true

    return <WalletForm>
        {complete ? <h1>My Wallet</h1> : <></>}
        {opt.list.map((e, i) => <input key={`input${i}`} placeholder={e.title} onChange={({target}) => changeData(target.value, e.value)} ></input>)}
        <button type="submit" onClick={handleSubmit}>{opt.submit}</button>
        {complete ? <Link to={opt.link.to}>{opt.link.text}</Link> : <></>}
    </WalletForm>
}

const WalletForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;

    input {
        width: 326px;
        height: 58px;
        background-color: white;
        border-radius: 5px;
        border: none;

        font-size: 20px;
        color: black;
        font-weight: 400;
    }

    input::placeholder {
        position: absolute;
        left: 15px
    }

    button {
        width: 326px;
        height: 46px;
        background-color: #A328D6;
        border-radius: 5px;
        border: none;

        font-size: 20px;
        color: white;
        font-weight: 700;
    }

    a {
        margin-top: 23px;

        font-size: 15px;
        color: white;
        font-weight: 700;

        text-decoration: none;
    }

    h1 {
        margin-bottom: 15px;

        font-family: "Saira Stencil One", cursive;
        font-size: 32px;
        color: white;
        font-weight: 400;
    }
`

export default Form