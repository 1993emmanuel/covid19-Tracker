import React from 'react'
import './InfoBox.css'
import{
    Card,
    CardContent,
    Typography
} from '@material-ui/core'

function InfoBox({title, cases, isRed ,active ,total, ...props}) {
    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'} `} onClick={props.onClick} >
            <CardContent>
                {/* title */}
                    <Typography color="textSecondary" className="infoBox__title">
                        {title}
                    </Typography>
                {/* # de casos */}
                        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                {/* total */}
                    <Typography color="textSecondary" className="infoBox__total ">
                        {total} Total
                    </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
