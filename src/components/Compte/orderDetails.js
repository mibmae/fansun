import React from 'react';
import './styles.scss';

function OrderDetails( { details, id }) {
    console.log('orderDetails', details, id)
  return (
   <div id={`orderDetails${id}`} className="contain">{details.map((e) => 
        <>
        <div className='details_container'>
        <div className="item_img"><img src={e.img} className="minipic" /></div>
        <div className="item_name">{e.name}</div>
        <div className="item_price">{e.price} €</div>
        </div>
        </>
    )}</div>
 );
}

export default OrderDetails;
