import React, { useState } from 'react'
import "./SharePage.scss"
import {AES, enc} from "crypto-js"


const SharePage = () => {
    let baseShare = "https://hangman-app.up.railway.app/sharable/";
    const [copy, setCopy] = useState(baseShare);
    const [copyinp, setcopyinp] = useState("");
    // var ciphertext = AES.encrypt(JSON.stringify(copyinp), 'my-secret-key@123').toString();
    // console.log(ciphertext)
    // // var bytes = ;
    // var decryptedData = JSON.parse(AES.decrypt(ciphertext, 'my-secret-key@123').toString(enc.Utf8));
    console.log(copyinp.slice(0, copyinp.length - 2))

    return (
        <div className='share'>
            <div className="home-header">
                {/* <h1 class="neon header" data-text="U">MA<span class="flicker-slow">I</span>N M<span class="flicker-fast">E</span>N<span class="flicker-fast">U</span></h1> */}
                <h1 class="neon header neonText h1text leader-head" data-text="U"><span class="flicker-slow">S</span>HARA<span class="flicker-fast">B</span>LE</h1>
            </div>
            <div className='share-page'>
                <h2>ENTER YOUR WORD HERE</h2>
                <input type="text" className='form-data' name="shareVal" value={copyinp} onChange={(e) => { 
                    setcopyinp(e.target.value)
                    setCopy(baseShare + e.target.value+10) }} />
            </div>
            <div className="share-page">
                <h2>{copy}</h2>
                <button className='home-btn' onClick={() => navigator.clipboard.writeText(copy)} >COPY</button>
            </div>
        </div>
    )
}

export default SharePage