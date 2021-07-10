import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './PoolPreview.scss';

export function PoolPreview({ member }) {
    const date = new Date();
    var dateDiff1 = moment(date);
    var dateDiff2 = moment(member.finishedAt);
    var result = dateDiff1.diff(dateDiff2);
    if (result < 0) {
        return (
            <Link to={'/pool/' + member._id}>
                <section className='pool-preview-cmp'>
                    <div className='pool-preview'>
                        <img
                            src={`https://i.pravatar.cc/150?u=${member._id}`}
                            alt=''
                        />
                        <h1>{member.name}</h1>
                    </div>
                    <div className='pool-preview-details'>
                        <h3>
                            Started At: {moment(member.createdAt).format('YYYY-MM-DD')}   
                        </h3>
                        <h3>finished: {moment(member.finishedAt).from()}</h3>
                    </div>
                </section>
            </Link>
        );
    } else {
        return (
            <Link to={'/pool/' + member._id}>
                <section className='pool-preview-cmp-err'>
                    <div className='pool-preview-err'>
                        <img
                            src={`https://i.pravatar.cc/150?u=${member._id}`}
                            alt=''
                        />
                        <h1>{member.name}</h1>
                    </div>
                    <div className='pool-preview-details-err'>
                        <h3>
                            Started At: {moment(member.createdAt).fromNow()}
                        </h3>
                        <h3 className='finished-err'>
                            finished: {moment(member.finishedAt).from()}
                        </h3>
                    </div>
                </section>
            </Link>
        );
    }
}
