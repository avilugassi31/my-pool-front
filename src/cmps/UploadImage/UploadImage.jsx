import React from 'react';

import upload from '../../assests/imgs/upload.svg';
import './UploadImage.scss';

export function UploadImage({ onUploadImage }) {
    
    return (
        <div className='upload-image'>
            <label htmlFor='upload'>
                <img src={upload} alt='' />
            </label>
            <input
                type='file'
                id='upload'
                name='upload'
                onChange={onUploadImage}
            />
        </div>
    );
}
