import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../src/hdr/Logo.png"
import Typewriter from 'typewriter-effect';
import Ar from "./ARViewer"

const Home = () => {
  const Location = useNavigate()
  return (
    <Ar/>
  )
}

export default Home