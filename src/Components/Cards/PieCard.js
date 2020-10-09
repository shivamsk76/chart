import React from 'react';
import PieChart from '../Dahboard/Piechart';


const PieCard = props =>{
    return(
        <div  className='card text-center'>
        <div   className='overflow'>
        
         <PieChart className="card-img-top" />
        </div>
        <div className='card-body text-dark'>
        <h4 className='card-title'> card title</h4>
        <p className="card-text text-secondary">sdfsffffffgddddddddddddddddddddddddddddddddddddddddd</p>
        
        <a href="#" className="btn btn-outline-success"> Attendence</a>
        </div>
        </div>
    )}

    export default PieCard;