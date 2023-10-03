export default{
    dataMyUserInfo(){
        let DataUser = localStorage.getItem("myUserInfo");
        if (DataUser === null) {localStorage.setItem("myUserInfo", JSON.stringify({
            roles:[],
            userName: "",
            idUser: 0
        }))  
        }
    }
}