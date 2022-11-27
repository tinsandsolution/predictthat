import React from 'react';
import Slider from 'react-input-slider';
import { useState } from 'react';
import './OddsSlider.css'

function OddsSlider({marketOdds}) {

    const [odds, setOdds] = useState(marketOdds);

    return (
        <>
        <div className='odds-slider-wrapper'>
            <span className='odds-label'> 0% </span>
            <Slider className='odds-slider'
                axis="x"
                x = {odds}
                xmin={0}
                xmax={100}
                onChange={(e) => setOdds(parseInt(e.x)) }
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
        <span className='entered-odds'>{odds}%</span>
        </>
    )

}

export default OddsSlider
