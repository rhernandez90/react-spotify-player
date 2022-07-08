import React, { useEffect, useState } from "react";
import "./new-releases.component.style.scss";
import { getNewReleases } from '../../service/spotify.service';
import { FaPlus } from 'react-icons/fa';

const NewReleasesComponent = () => {

    const [newSongs, setNewSongs] = new useState([]);


    useEffect(() => {
        GetNewReleases();
    }, [])


    const GetNewReleases = async () => {
        const newReleases = await getNewReleases();
        setNewSongs(newReleases);
    }

    const songCards = newSongs.map(x => {
        return (
            <div className="new-release-card">
                <div className="new-release-img">
                    <FaPlus className="plus-icon"/>
                    <img src={x.image} alt='Loading' />
                    <div className="new-releases-tittles">
                        <labe>{x.songName}</labe>
                        <labe>{x.singer}</labe>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="new-releases" style={{marginTop: '10px'}}>
            <h4 className='title-releases'>New releases</h4>
            <div >
                {songCards}
            </div>
        </div>

    );
}

export default NewReleasesComponent;