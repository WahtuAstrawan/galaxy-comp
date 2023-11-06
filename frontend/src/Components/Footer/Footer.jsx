import React from 'react'
import './Footer.css'
import { UilFacebook, UilWhatsappAlt, UilTwitter } from '@iconscout/react-unicons'

function Footer() {
  return (
    <div className='footer' id='contact-section'>
      <div className='footer-container'>
        <div className="row">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Our service</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="#">Whatsapp</a></li>
              <li><a href="#">Shope</a></li>
              <li><a href="#">Tokopedia</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow us</h4>
            <div className='social-links'>
              <a href="#"><UilFacebook></UilFacebook></a>
              <a href="#"><UilWhatsappAlt></UilWhatsappAlt></a>
              <a href="#"><UilTwitter></UilTwitter></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer