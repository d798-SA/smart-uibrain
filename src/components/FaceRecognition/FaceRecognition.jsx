import React from "react";
import './FaceRecognition.css';
import './default.jpg';


const FaceRecognition = ({ imageUrl, boundingBox }) => {
    return (
        <div style={{ maxWidth: "100%", padding: '.4rem 2.3rem' }} className="center">
         <div style={{position: "relative"}}>
                
                <img className='br3 shadow-5' id='targetImage' src={imageUrl || 'https://dsm01pap006files.storage.live.com/y4mRldp3XFf9cUWXWtjk_i0zdtrAUODJRN1ZezH57XpGixgKvkxHHrXw2hI4wI_H7kT83pjjzYIh0o64Duax3almX3dvROJ6BSnSVBO4ubbR4llptKxNcNyTnu69TRottQLWEQZWKbAXH9fAQ4XQhNNvsIYDxt5eZ2PDmlxT116b24s_XBzVY3u4-l9VuX4b8Ck?width=400&height=300&cropmode=none'} alt="" />

                <div className="bounding-box" style={{
                    top: boundingBox.topRow
                    , left: boundingBox.leftCol,
                    right: boundingBox.rightCol,
                    bottom: boundingBox.bottomRow
                }} ></div>
         </div>
        </div>
    )
}

export default FaceRecognition