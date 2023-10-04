import React, { useState, useEffect, useRef } from 'react'
import '../../public/modalInfo.css'

import { PropTypes } from 'prop-types';

export default function ModalInfo() {

    useEffect(() => {

        const modal= document.querySelector(".modal");
        const closeModal = document.querySelector('.modal__close');
        closeModal.addEventListener('click', (e)=>{
            e.preventDefault();
            modal.classList.remove('modal--show');
        });
    }, []);
  
    return (
        <>
            <section className="modal">
                <div className="modal__container">
                    <div className='modal_Info'>

                    </div>
                <button className="modal__close"> Hide Modal</button>
                </div>
            </section>
        </>
    )
}