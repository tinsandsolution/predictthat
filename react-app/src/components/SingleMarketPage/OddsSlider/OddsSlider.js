import React from 'react';
import Slider from 'react-input-slider';
import { useState } from 'react';
import './OddsSlider.css'

function OddsSlider({marketOdds, setForecast}) {

    const [odds, setOdds] = useState(marketOdds);
    setForecast(odds)

    return (
        <>
        <div className='odds-slider-wrapper'>
            <span className='odds-label'> 0% </span>
            <Slider className='odds-slider'
                axis="x"
                x = {odds}
                xmin={0}
                xmax={100}
                onChange={(e) => {
                    setOdds(parseInt(e.x))
                    setForecast(parseInt(e.x))
                }}
                styles={{
                track: {
                    width: "100%",
                    backgroundColor: '#dd99ff',
                },
                active: {
                    backgroundColor: '#265CFF'
                },
                thumb: {
                    backgroundColor: 'gainsboro',
                }
                }}
            />
            <span className='odds-label'> 100% </span>
        </div>
        <span className='entered-odds'>Given a forecast of {odds}% -</span>
        </>
    )

}

export default OddsSlider
