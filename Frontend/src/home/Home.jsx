// src/home/Home.jsx
import React from 'react';
import './assets/css/Home.css';
import { 
    Home_About, 
    Home_Contact, 
    Home_Experience, 
    Home_GitContribution, 
    Home_Hero, 
    Home_Project, 
    Home_Skill,
} from './Home_Import';

const Home = () => {
    return (
        <div className="home-page">
        {/* Global background shapes – shared by both components */}
            <div className="home-bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>

            <Home_Hero />
            <Home_About/>
            <Home_GitContribution />
            <Home_Experience/>
            <Home_Skill/>
            <Home_Project/>
            <Home_Contact/>
        </div>
    );
};

export default Home;