import rateLimit from "express-rate-limit";

export let getLimit = () => {
    return rateLimit({
        windowMs: 15 * 1000,
        max: 5, 
        standardHeaders: true, 
        legacyHeaders: false, 
        skip: (req, res) =>{
            if(req.headers["content-length"]>1){
                res.status(413).send({
                    status: 413,
                    message: "no input data is allowed"
                });
                return true;
            }
        },
        message: (req, res)=>{
            res.status(429).send({
                status: 429,
                message: 'too many queries have been made, please try again in 15 seconds.'
            })
        }
    })
}

export let postAndPutLimit = (num) => {
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5, 
        standardHeaders: true, 
        legacyHeaders: false, 
        skip: (req, res) =>{
            if(req.headers["content-length"]>num){
                res.status(413).send({
                    status: 413,
                    message: "data length range has been exceeded at this endpoint"
                });
                return true;
            }
        },
        message: (req,res)=>{
            res.status(429).send({
                message: `too many queries have been made try again in 30 seconds`
            })
        }
    })
}

export let deleteLimit = () => {
    return rateLimit({
        windowMs: 60 * 1000,
        max: 5, 
        standardHeaders: true, 
        legacyHeaders: false, 
        skip: (req, res) =>{
            if(req.headers["content-length"]>40){
                res.status(413).send({
                    status: 413,
                    message: "data length range has been exceeded at this endpoint"
                });
                return true;
            }
        },
        message: (req,res)=>{
            res.status(429).send({
                status: 429,
                message: 'too many queries have been made try again in a minute'
            })
        }
    })
}