import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './Footer.css'

function Footer(){


    return (
       <footer>
            <div className="creators">
                <h4>Created By: Ben Danishevsky</h4>
                <div className='about-links'>
                    <p className='link-tag'>
                        <a href="https://www.linkedin.com/in/benjamin-danishevsky-0a158a237/">LinkedIn</a>
                    </p>
                    <p className='link-tag'>
                        <a href="https://github.com/benjamin-danishevsky">Github</a>
                    </p>
                </div>
            </div>
       </footer>
    )
}

export default Footer;
