import React from 'react';
import { PoolPreview } from '../PoolPreview';
import './PoolList.scss';

export function PoolList({ members }) {
    return (
        <div className='pool-list'>
            {members &&
                members.map((member) => {
                    return <PoolPreview key={member._id} member={member} />;
                })}
        </div>
    );
}
