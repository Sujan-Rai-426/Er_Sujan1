import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home_Import'

const Home_Route = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home/>} />
        </Routes>
    )
}

export default Home_Route