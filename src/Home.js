import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../src/hdr/Logo.png"
import logo2 from "../src/logo-paris.png"
import Typewriter from 'typewriter-effect';
import ar from "../src/bg.png"

const Home = () => {
  const Location = useNavigate()
  return (
    <div className='vh-100 text-black '>
      <a href="https://realitiqxr.com/" rel="noreferrer" target='_blank'>
        <img style={{ maxWidth: "120px" }} className='position-absolute bg-dark-subtle pointer top-0 start-0 z-3 ms-2 p-0 mt-1 rounded' alt='logo' src={logo} />
      </a>
      <img style={{ maxWidth: "120px" }} className='position-absolute bg-dark-subtle pointer top-0 end-0 z-3 me-2 p-0 mt-1 rounded' alt='logo' src={logo2} />
      <div
        style={{
          fontSize: '50px',
          backgroundImage: `url(${ar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding: '3rem',
        }}
        id='wishingtext'
        className='p-3 text-white text-center d-flex justify-content-center flex-column align-items-center h-100 bg-black w-100'>
        {/* <a href="https://realitiqxr.com/" rel="noreferrer" target='_blank'><img style={{ maxWidth: "180px" }} className='position-absolute pointer top-0 start-0 z-3 ms-2 rounded' alt='logo' src={logo} /></a> */}
        <Typewriter
          options={{
            strings: ['Good luck, Team India at Paris 2024!'],
            autoStart: true,
            loop: true,
            delay: 75,
          }}
        />
        <div>
          <span onClick={() => {
            Location('/ar')
          }} className="bipping-button m-auto">
            Go
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home