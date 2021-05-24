import React from 'react';
import { Link } from 'react-router-dom';
import './PoolPreview.scss';

export function PoolPreview({ member }) {
    return (
        <Link to={'/pool/' + member._id}>
            <div className='pool-preview'>
                <img src={`https://i.pravatar.cc/150?u=${member._id}`} alt='' />
                <h1>{member.name}</h1>
            </div>
        </Link>
    );
}
