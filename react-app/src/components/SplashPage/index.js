import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './SplashPage.css';
import splashImg from '../images/pokemon-splash.png';
import icon from '../images/bulbasaur.png'
function SplashPage(){



    return (
        <>
            <div className='splash-page-container'>
                <div className='splash-page-image-container'>
                    <img src={splashImg} alt='website logo'  className='splash-logo' />
                </div>
                <div className='splash-page-card-container'>
                    <img src={icon} alt='icon' className='icon'/>
                    <h1 className='splash-h1'>Happening now</h1>
                    <h3 className='splash-h3'>Join PokeChirps today.</h3>
                    <a href='/sign-up'><button className='sign-up-button'>Sign up</button></a>
                    <a href='/login'><button className='login-button'>Sign in</button></a>
                </div>
            </div>
        </>
    )
}


export default SplashPage;
