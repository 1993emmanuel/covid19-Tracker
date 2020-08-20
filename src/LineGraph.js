import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend:{
        display : false,
    },
    elements : {
        point : {
            radius : 0,
        },
    },
    maintainAspectRatio : false,
    tooltips :{
        mode : 'index',
        intersect : false,
        callback : {
            label : function(tooltipsItem, data){
                return numeral(tooltipsItem.value).format("+0,0");
            },
        },
    },
    scales : {
        xAxes : [
            {
                type : 'time',
                time : {
                    format : 'MM/DD/YY',
                    tooltipFormat : 'll',
                },
            },
        ],
        yAxes : [
            {
                gridLines : {
                    display : false,
                },
                ticks : {
                    //Include a dollar sign in the ticke
                    callback: function(value,index,values){
                        return numeral(value).format("0a");
                    }
                },
            },
        ],
    },
}

const buildCharData = (data, casesType="cases")=>{
    const charData= []
    let lastDataPoint;

    for(let date in data.cases) {
        if(lastDataPoint){
            const newDataPoint={
                x : date,
                y : data[casesType][date] - lastDataPoint
            };
            charData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
    }
    return charData
}


function LineGraph({casesType = 'cases', ...props}) {

    const [ data , setData] = useState({})

    //https://disease.sh/v3/covid-19/historical/all?lastdays=30

    useEffect(()=>{
        const fetchData = async()=>{
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response=>response.json())
            .then(data=>{
                let chartData = buildCharData(data, 'cases');
                setData(chartData);
            })
        }
        fetchData();
    },[])

    return (
        <div className={props.className}>
            <h1>I am the Graph</h1>
            {data?.length > 0 && (
                <Line
                    options = {options}
                    data={{
                        datasets:[{
                            backgroundColor : "rgba(204,16,52,0.8)",
                            borderColor : '#CC1034',
                            data : data
                        }]
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph
