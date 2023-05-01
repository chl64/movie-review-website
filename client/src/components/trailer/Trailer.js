// A YouTube video ID is passed into `Trailer` as a parameter. 
// `useParams` hook extracts the relevant parameter value from the URL.
import {useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';

import React from 'react'

const Trailer = () => {

    let params = useParams();
    const key = params.ytTrailerId;

    return (
    <div className="react-player-container">
        {/* Player should enable `controls`, and `playing` should start as soon as the `Trailer` component loads.
         */}
        {(key!=null)?<ReactPlayer controls="true" playing={true} url={`https://www.youtube.com/watch?v=${key}`} 
        width = '100%' height='100%' />:null}
    </div>
    )
}

export default Trailer