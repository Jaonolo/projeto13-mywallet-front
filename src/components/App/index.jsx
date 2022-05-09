import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"

import Add from "../Add"
import Login from "../Login"
import Register from "../Register"
import Home from "../Home"
import PublicRoutes from "../PublicRoutes"
import PrivateRoutes from "../PrivateRoutes"

import UserContext from "../../contexts/UserContext.jsx"
import UrlContext from "../../contexts/UrlContext.jsx"

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    return <UserContext.Provider value={{user, setUser}}>
            <UrlContext.Provider value={'http://localhost:5000'}>
                <BrowserRouter>
                    <AppContainer>
                        <Routes>
                            <Route element={<PublicRoutes/>} >
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/login" element={<Login/>}/>
                            </Route>
                            <Route element={<PrivateRoutes/>} >
                                <Route path="/" element={<Home/>}/>
                                <Route path="/add" element={<Add signal={1}/>}/>
                                <Route path="/subtract" element={<Add signal={-1}/>}/>
                            </Route>
                        </Routes>
                    </AppContainer>
                </BrowserRouter>
            </UrlContext.Provider>
        </UserContext.Provider>
}

const AppContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #8C11BE;
    height: 100vh;
`

export default App