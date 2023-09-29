export const emailTemplateCode = (p1) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            text-align: center;
            background-color: #fffadb;
        }

        .card {
            display: inline-block; 
            padding: 1rem;
            background-color: #fffadb;
            max-width: 320px;
            border-radius: 20px;
            box-shadow: 10px 10px #323232;
            border: 3px solid #323232;
            text-align: left; 
        }

        .title {
            display: flex;
            align-items: center;
        }

        .title span {
            position: relative;
            padding: 0.5rem;
            background-color: #be1a95;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 9999px;
        }

        .title-text {
            margin-left: 0.5rem;
            color: #a80083;
            font-size: 25px;
            font-weight: 700;
        }

        .timer {
            margin-left: 0.5rem;
            color: #7f00b2;
            font-weight: 600;
            display: flex;
        }

        .data {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        .data p {
            margin-top: 1rem;
            margin-bottom: 1rem;
            color: #a80083;
            font-size: 2.25rem;
            line-height: 2.5rem;
            font-weight: 700;
            text-align: left;
        }
        
        button {
            display: inline-block;
            background : #fff0ff;
            width: 150px;
            height: 50px;
            border-radius: 10px;
            border: 1px solid #03045e;
        }
   
        button:hover span {
            color: #7600a9;
            font-weight: 700;
            transition: 0.3s;
        }
   
        button span {
            color: #03045e;
            font-size: 18px;
            transition: all 0.3s ease-in;
        }
    </style>
</head>
<body>
    <div>
        <img src="https://i.ibb.co/ZBsxT3R/home-Email-Recovery.png" alt="homeEmailRecovery">
    </div>

    <p>Attention, campus incident user!</p>
        <br>
    <p>Hello ${p1.Name},</p>

    <p>We hope you are feeling well.</p>
    <br>
    <p>We noticed that you have requested to recover your IncidentsCampus account password, and we are here to help you regain access to your account securely and easily.</p>
    <br>
    <p>To continue, please use the following access code on our website:</p>

    <div class="card">
        <div class="title">
            <span></span>
            <p class="title-text">🔑 Code 🔑</p>
        </div>
        <div class="data">
            <p>${p1.Recovery_Code}</p>
        </div>
        <p class="timer">Code duration: 6 minutes</p>
    </div>
    <br>
    <p>This special code will be available for up to 6 minutes after this email is sent Date sent: (${p1.CreatedAt}), so be sure to use it soon.</p>

    <p>If you have not requested this password recovery, don't worry. Your security is our priority. Please contact our support team immediately to resolve any concerns.</p>

    <p>At IncidentsCampus, we pride ourselves on providing you with the best incident handling experience. We appreciate your trust in us and we are here to serve you.</p>
    <br>
    <p>Visit our website right now to recover your password:</p>

    <button>
        <span> IncidentsCampus
        </span>
    </button>

    <br>
    <p>Thank you for being part of the IncidentsCampus family!</p>
    <br>

    <div>
        <img src="https://pa1.aminoapps.com/6778/58779ab3dd0bfdde766e2bad96a45df3f8f84644_hq.gif" alt="gifPurple">
    </div>
</body>
</html>    
`
}


export const emailCreationUser = (p1) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            text-align: center;
            background-color: #fffadb;
        }
    </style>
</head>
<body>
    <div>
        <img src="https://i.ibb.co/mNhsvR7/Home-Emailuser-Created.png" alt="homeUserCreated">
    </div>

    <p>Hello ${p1.Name},</p>

    <p>Welcome to our incident management platform!</p>
    <br>
    <p>We have successfully created your account on our platform. We are excited to have you as part of our community.</p>
    <br>

    <div>
        <img src="https://cdn.dribbble.com/users/1542965/screenshots/3745969/user_icon_to_medal_01.gif" alt="gifUser">
    </div>

    <br>
    <p>However, before you can start using our website, you need approval from a trainer or administrator. This is part of our security and quality process to ensure the best possible experience.</p>

    <br>
    <p>Once your account is reviewed and approved, you will receive a confirmation email and you can start using our services.</p>

    <br>
    <p>Thank you for being part of the IncidentsCampus family!</p>
    <br>

    <p>Sincerely yours,</p>
    <p>Campus Incidents</p>

    <div>
        <img src="https://i.pinimg.com/originals/44/8c/13/448c13df411af9f2136e41f41e716ad9.gif" alt="gifPurple">
    </div>
</body>
</html>    
`
}

export const emailValidationUser = (p1) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            text-align: center;
            background-color: #fffadb;
        }
    </style>
</head>
<body>
    <div>
        <img src="https://i.ibb.co/VVzXvLH/home-Emai-Validated-User.png" alt="homeUserCreated">
    </div>

    <p>Hello ${p1.Name},</p>

    <p>Welcome to our incident management platform!</p>
    <br>
    <p>We are pleased to inform you that your account on our incident management platform has been successfully validated.</p>
    <br>

    <div>
        <img src="https://media.tenor.com/mcWaLZH4OjUAAAAC/hello-neon.gif" alt="gifUser">
    </div>

    <br>
    <p>You now have full access to our services and can start using them immediately.</p>

    <br>
    <p>   If you have any questions or need assistance, please do not hesitate to contact our support team.</p>

    <br>
    <p>Thank you for being part of the IncidentsCampus family!</p>
    <br>

    <p>Sincerely yours,</p>
    <p>Campus Incidents</p>

    <div>
        <img src="https://i.pinimg.com/originals/44/8c/13/448c13df411af9f2136e41f41e716ad9.gif" alt="gifPurple">
    </div>
</body>
</html>    
`
}