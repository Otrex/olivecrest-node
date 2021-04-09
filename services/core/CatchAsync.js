
module.exports= (fn, err) =>{
    return(req, res, next)=>{
        fn(req, res, next)
        .catch(err => {
        	next(err)
        })
    }
}

