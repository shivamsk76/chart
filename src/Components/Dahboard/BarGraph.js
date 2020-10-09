import React, { Component } from 'react';
import  {Bar}  from 'react-chartjs-2';
import './Dashboard.css'



export class BarGraph extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             chartData:{
                 labels: ['shivam', 'sameer','vivek','sam'],
                  datasets: [
                      {
                          label:'Population',
                          data:[ 
                              215465,
                              546543,
                              922226,
                              123456
    
                          ],
                          backgroundColor:[
                              'rgba(255,99,132,0.6)',
                              'rgba(54,162,235,0.6)',
                              'rgba(255,206,86,0.6)',
                              'rgba(225,206,86,0.6)',
    
                          ]
                      }
                  ]
             }
        }
    }

    render() {
        return (
            <div>
           
        <Bar
        
                             
        data={this.state.chartData}
        height="40"
        width="70"
    
             options={{
            title:{
                text:'shivam Cities',
                display:'true',
                fontSize:25,
                position:"top"
                 },
            legend:{
               
                position:'top',
                 
                
               
            
            }
        }} 
      /> 
            </div>
           )
    }
}

export default BarGraph

