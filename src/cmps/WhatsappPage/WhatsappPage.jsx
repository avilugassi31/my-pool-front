import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './WhatsappPage.scss';
import message from '../../assests/imgs/message.png';
AOS.init();
export function WhatsappPage({ member }) {
    console.log('member:', member);
    return (
        <a
            href={`https://wa.me/${member.phone}`}
            className='whatsapp_float'
            target='_blank'
            rel='noopener noreferrer'
        >
            <img src={message} alt='' />
        </a>
    );
}
