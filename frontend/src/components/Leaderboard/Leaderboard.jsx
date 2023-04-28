import React, { useEffect, useState } from 'react'
import "./Leaderboard.scss"
import * as AuthApi from "../../AuthRequests";


const Leaderboard = () => {
  const [leader, setleaderData] = useState();

  useEffect(() => {

    const getData = async () => {
        const response = await AuthApi.leaderboardData();
        const data2 = [...response.data.users].sort((a, b) =>
                    a.userScore > b.userScore ? -1 : 1
                );
        setleaderData(data2);
    };
    getData();
    return () => {
        // this now gets called when the component unmounts
    };
}, []);

  return (
    <>
    {leader ?
    <div className='leaderboard'>
         {/* <div className="home-header">
            <h1 class="neon header" data-text="U"><span class="flicker-slow">L</span>EADER <span class="flicker-fast">B</span>OAR<span class="flicker-fast">D</span></h1>
        </div> */}
        <div className="home-header">
                {/* <h1 class="neon header" data-text="U">MA<span class="flicker-slow">I</span>N M<span class="flicker-fast">E</span>N<span class="flicker-fast">U</span></h1> */}
                <h1 class="neon header neonText h1text leader-head" data-text="U"><span class="flicker-slow">L</span>EADER <span class="flicker-fast">B</span>OAR<span class="flicker-fast">D</span></h1>
              
        </div>
        <table className='locationTable'>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
            {
              leader?.map((item, idx)=>{
                return <tr key={item._id}>
                  <td>{idx+1}</td>
                  <td>{item.username}</td>
                  <td>{item.userScore}</td>
                </tr>
              })
            }
                
         </table>

    </div>
    : <div className='loading neon header neonText'>Loading...</div>
    }
    </>
  )
}

export default Leaderboard