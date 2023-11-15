import {React} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'reactstrap';
import logo from './logo.png'

function About() {

  return (
    <>
      <div id='about-section' style={{ backgroundColor:"white", width:"100%", height:"40%" }}>
        <h1 style={{ paddingBottom:"50px", paddingTop:"50px"}}>About Us</h1>
        <Row>
          <Col md="4">
            <img
              src={logo}
              alt="galaxycomp-logo"
              className="mx-24"
              style={{ width:"300px", height:"300px" }}
            />
          </Col>
          <Col md="6">
            <p style={{ textAlign:"justify", padding:"10px 50px" }}>
              Galaxy Computer Bali adalah sebuah toko hardware elektronik di Bali.
              Dengan harga yang bersaing dan kualitas produk yang terjamin
              Orisinalitasnya. Menjual berbagai macam keperluan elektronik, khususnya
              Komputer, Monitor, Mouse, Harddisk, dan lain-lain!
            </p>
            <p style={{ textAlign:"justify", padding:"10px 50px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa.
            </p>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default About