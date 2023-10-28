import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'
import './ProductCards.css'
import keyboard from './gamen.png'

const cardData = [
  {
    title: 'Gamen Titan III',
    category: 'Keyboard Gaming',
    imageSrc: keyboard,
    description: 'Gamen Titan III Merupakan Keyboard Gaming Lokal',
    price: '250,000',
    stock: '20',
  },
];

function ProductCards() {
  return (
    <>
      <div className='card-list-title' id='product-section' style={{ margin:"50px" }}>
        <h1>Product Available</h1>
      </div>
      <div className='card-list-horizontal'>
        {Array(10).fill(0).map((_, index) => (
          <Card key={index} style={{ width: '18rem', marginRight: '10px' }}>
            <CardBody>
              <CardTitle tag="h5">{cardData[0].title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {cardData[0].category}
              </CardSubtitle>
            </CardBody>
            <a href="#">
              <img alt="card-img" src={cardData[0].imageSrc} width="100%" />
            </a>
            <CardBody>
              <CardText style={{ textAlign: 'left', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden', maxHeight: '3em' }}>
                {cardData[0].description}
              </CardText>
              <CardText style={{ textAlign: 'left' }}>
                Harga : Rp.{cardData[0].price}
                <br />
                Stok : {cardData[0].stock} Unit
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  )
}

export default ProductCards