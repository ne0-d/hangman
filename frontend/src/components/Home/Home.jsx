import React from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom'

const Home = () => {
    const handleLogut = e =>{
        localStorage.clear();
                window.location.reload(false); 
    }
    return (
        <div className='home'>
            <div className='nav-logout neon ' onClick={handleLogut}>LOGOUT</div>
            <div className="home-header">
                {/* <h1 class="neon header" data-text="U">MA<span class="flicker-slow">I</span>N M<span class="flicker-fast">E</span>N<span class="flicker-fast">U</span></h1> */}
                <h1 class="neonText h1text ">
                    Main <span class="flicker-slow" >ME</span>nu
                </h1>
            </div>

            <div className='home-btns'>
                <Link to="../play" className='link-class' >
                    <button className='home-btn'>
                        PLAY
                    </button>
                </Link>
                <Link to="../sharable" className='link-class'  >
                <button className='home-btn'>CHALLENGE A FRIEND</button>

                </Link>
                <Link to="../leaderboard"  className='link-class' >
                <button className='home-btn'>LEADERBOARD</button>

                </Link>

            </div>
        </div>
    )
}

export default Home