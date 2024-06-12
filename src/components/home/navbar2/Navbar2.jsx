import React from 'react'
import './Navbar2.css'
import hospital from '../images/hospital.png';
import email from '../images/email.png';
import phone from '../images/phone.png';
import complain from '../images/complain.jpg';
import {Link} from 'react-router-dom'

const Navbar2 = () => {
  return (
    <div className='navbar2'>
      <div className='navbar21'>
        <div><img className='navbar211img' src={hospital} alt=''></img></div>
      </div>
      <div className='navbar22'>
        <div className='navbar221'><img className='navbar221img' src={email} alt=''></img><Link to="">karancpppython@gmail.com</Link></div>
        <div className='navbar221'><img className='navbar222img' src={phone} alt=''></img>9832826152</div>
        <div className='navbar221'><img className='navbar222img' src={complain} alt=''></img><Link to="">Complaint</Link></div>
      </div>
    </div>
  )
}

export default Navbar2