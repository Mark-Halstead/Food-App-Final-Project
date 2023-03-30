import React, { useState } from 'react'

import './styles.css'

function MoodMenu({ mood, handleMoodClick, showMoodMenu, setShowMoodMenu, menuRef }) {
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
                    <i className={`${moodFace[mood]} icon-btn`}></i>
                </button>
            </div>
            {showMoodMenu &&
                    <div ref={menuRef} className="popup-menu">
                        <button
                            onClick={() => handleMoodClick(1)}
                        >
                                <i className="fa-regular fa-face-frown icon-btn"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(2)}
                        >
                            <i className="fa-regular fa-face-frown-open icon-btn"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(3)}
                        >
                            <i className="fa-regular fa-face-meh icon-btn"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(4)}
                        >
                            <i className="fa-regular fa-face-smile icon-btn"></i>
                        </button>
                        <button
                            onClick={() => handleMoodClick(5)}
                        >
                            <i className="fa-regular fa-face-smile-beam icon-btn"></i>
                        </button>
                    </div>
                }
        </>
    )
}

export default MoodMenu