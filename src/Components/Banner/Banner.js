import React, { useContext } from 'react'
import { AuthUserContext } from '../../Context/AuthContext';
import { GoogleAuthButton } from '../GoogleAuthButton/GoogleAuthButton';
import {Link} from 'react-router-dom'
import './Banner.css';

function Banner() {
  const [AuthUser] = useContext(AuthUserContext)

  return (
    <div className='banner'>
        <div className='content'>
            <h1 className='title'>Sail Away the Debries</h1>
            <h2 className='title2'>Help to keep the marine ecosystem healthy by using <b className='bold'>Clean Coast</b></h2>
            <div className='banner_button'>
                
                {AuthUser == null? <GoogleAuthButton/> : 
                <><Link to='/report' className='button'>Report</Link>
                <Link to='/collect' className='button'>Collect</Link>
                </>}
                
            </div>

            <h1 className='description'>"The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul."</h1>
        </div>

        
    </div>
  )
}

export default Banner