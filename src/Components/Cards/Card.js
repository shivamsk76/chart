import React, { Component } from 'react'
import PieCard from './PieCard';
import './Card.css';
import BarCard from './BarCard';
import LineCard from './LineCard';




 class CardUi extends Component {
    render() {
        return (
            <div className='container-fluid d-flex justify-content-center'>
            <div className='row'>
                <div className='div1'><PieCard/></div>
                <div className='div2'> <BarCard/> </div>
                <div  className='div3'><LineCard/> </div>
            </div>
                
            </div>
        )
    }
}

export default CardUi
