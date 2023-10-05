

export let modalError = async (response)=>{
    
    const modalError = document.querySelector(".modal_Info");
    const closeModal = document.querySelector('.modal__close');
    const modal= document.querySelector(".modal");

    while (modalError.firstChild) {
            modalError.removeChild(modalError.firstChild);
    }

    let p1 = response
    let responseAPI = p1.data;
    let errorElements = null;

    if (responseAPI.errors) {
        errorElements = responseAPI.errors.map(error => `
        <h4 class="modal__subTitle">Error Type: ${error.type}</h4>
        <p class="modal__paragraph">Value: ${error.value}</p>
        <p class="modal__paragraph">Message: ${error.msg}</p>
    `).join('');
    }
   
    const modalE = `
        <h2 class="modal__title">Error sending data</h2>
        <h4 class="modal__subTitle">${p1.statusText}</h4>
        <img src="https://media.tenor.com/eDchk3srtycAAAAj/piffle-error.gif" class="modal__img" alt="imgModal" width="100%"/>
        ${(responseAPI.message) 
            ? `<h4 class="modal__subTitle">Credential errors:</h4>
            <p class="modal__paragraph">${responseAPI.message}</p>` : ''
        }
        ${(errorElements) 
            ? `<h4 class="modal__subTitle">Validation errors:</h4>
            <p class="modal__paragraph">${errorElements}</p>` : ''
        }
        <p class="modal__subTitle">Please try again</p>
    `

    modalError.insertAdjacentHTML("beforeend", modalE)
   
    modal.classList.add('modal--show');
}

export let modalSignUp = async (response)=>{
    
    const modalUser = document.querySelector(".modal_Info");
    const modal= document.querySelector(".modal");

    while (modalUser.firstChild) {
        modalUser.removeChild(modalUser.firstChild);
    }

    let p1 = response
    let responseAPI = p1.data;

    const modalU = `
        <h2 class="modal__title">User successfully created!</h2>
        <h4 class="modal__subTitle">${p1.statusText}</h4>
        <img src="https://i.pinimg.com/originals/dc/b2/42/dcb242f28517da9d098ee766280fbda8.gif" class="modal__img" alt="imgModal" width="100%"/>
        <h4 class="modal__subTitle">Message:</h4>
        <p class="modal__paragraph">check your email for updates on your account status and the validation process.</p>
        <p class="modal__paragraph">Remember your username and password</p>
    `

    modalUser.insertAdjacentHTML("beforeend", modalU)
   
    modal.classList.add('modal--show');
}

export let modalPost = async (response)=>{
    
    const modalUser = document.querySelector(".modal_Info");
    const modal= document.querySelector(".modal");

    while (modalUser.firstChild) {
        modalUser.removeChild(modalUser.firstChild);
    }

    let p1 = response
    let responseAPI = p1.data;

    const modalU = `
        <h2 class="modal__title">incidence successfully created!</h2>
        <h4 class="modal__subTitle">${p1.statusText}</h4>
        <img src="https://i.pinimg.com/originals/dc/b2/42/dcb242f28517da9d098ee766280fbda8.gif" class="modal__img" alt="imgModal" width="100%"/>
        <h4 class="modal__subTitle">Message:</h4>
        <p class="modal__paragraph">the incident has been created correctly.</p>
    `

    modalUser.insertAdjacentHTML("beforeend", modalU)
   
    modal.classList.add('modal--show');
}

export let modalSendEmail = async (response)=>{
    
    const modalUser = document.querySelector(".modal_Info");
    const modal= document.querySelector(".modal");

    while (modalUser.firstChild) {
        modalUser.removeChild(modalUser.firstChild);
    }

    let p1 = response

    const modalU = `
        <h2 class="modal__title">verification code!</h2>
        <h4 class="modal__subTitle">hello dear user:</h4>
        <h4 class="modal__paragraph">${p1.usuario}</h4>
        <img src="https://i.gifer.com/QHTn.gif" class="modal__img" alt="imgModal" width="100%"/>
        <h4 class="modal__subTitle">Message:</h4>
        <p class="modal__paragraph">You have requested a password recovery, your verification code has been sent to the email ${p1.email}, remember to check your spam folder if you can't find the email.</p>
        <p class="modal__subTitle">The code in the mail is valid for 6 minutes!</p>
    `

    modalUser.insertAdjacentHTML("beforeend", modalU)
   
    modal.classList.add('modal--show');
}

export let modalChangePW = async (response)=>{
    
    const modalUser = document.querySelector(".modal_Info");
    const modal= document.querySelector(".modal");

    while (modalUser.firstChild) {
        modalUser.removeChild(modalUser.firstChild);
    }

    let p1 = response

    const modalU = `
        <h2 class="modal__title">Password updated correctly!</h2>
        <h4 class="modal__subTitle">hello dear user:</h4>
        <h4 class="modal__paragraph">${p1.usuario}</h4>
        <img src="https://cdn.templates.unlayer.com/assets/1676615059956-password.gif" class="modal__img" alt="imgModal" width="100%"/>
        <h4 class="modal__subTitle">Message:</h4>
        <p class="modal__paragraph">Password successfully updated, your account is now linked to the password you just entered, you can now log in correctly.</p>
    `

    modalUser.insertAdjacentHTML("beforeend", modalU)
   
    modal.classList.add('modal--show');
}