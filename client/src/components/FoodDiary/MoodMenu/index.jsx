import React, { useState } from 'react'

import './styles.css'

function MoodMenu({ mood, handleMoodClick, showMoodMenu, setShowMoodMenu }) {
    const moodFace = {
        1:"fa-regular fa-face-frown",
        2:"fa-regular fa-face-frown-open",
        3:"fa-regular fa-face-meh",
        4:"fa-regular fa-face-smile",
        5:"fa-regular fa-face-smile-beam"
    }

    const openMoodMenu = () => {
        setShowMoodMenu(true)
    }
    return (
        <>
            <div className='mood-menu-container'>
                <button
                    onClick={openMoodMenu}
                    className="hello"
                >
                    <i class={`${moodFace[mood]} hello`}></i>
                </button>
            </div>
            {showMoodMenu &&
                    <div className="popup-menu">
                        <button
                            onClick={() => handleMoodClick(1)}
                        >
                                <i className="fa-regular fa-face-frown"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(2)}
                        >
                            <i className="fa-regular fa-face-frown-open"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(3)}
                        >
                            <i className="fa-regular fa-face-meh"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(4)}
                        >
                            <i className="fa-regular fa-face-smile"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(5)}
                        >
                            <i className="fa-regular fa-face-smile-beam"></i>
                        </button>
                    </div>
                }
        </>
    )
}

export default MoodMenu