import React from 'react';
import Image from 'next/image';

const Avatar = ({ data, placeHolder, name, customeClass, height, width, noPrevClass }) => {
    return (
        <>
            {
                data?.original_url ?
                    <div className={`${!noPrevClass ? 'user-profile user-round' : ""} ${customeClass ? customeClass : ""}`}>
                        <Image src={data?.original_url} className={customeClass ? customeClass : ""} height={height || 50} width={width || 50} alt={name?.name || ""} />
                    </div>
                    : placeHolder ?
                        <div className={`user-profile user-round ${customeClass ? customeClass : ""}`}><Image src={placeHolder} height={height || 50} width={width || 50} alt={name?.name} /></div>
                        : <h4>{name?.name?.charAt(0).toString().toUpperCase()}</h4>
            }
        </>
    )
}

export default Avatar