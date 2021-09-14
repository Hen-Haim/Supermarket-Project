const cacheModule = require("../logics/cache-module");

let errorHandler = (err, req, res, next) => {
    console.log("here -error handler")
    if (err.errorType != undefined) {
        console.log("error handler", err)
        if (err.errorType.isShowStackTrace) {
            console.error("show me my error", err);
        }
        if(err.innerError?.errorType?.httpCode){
            res.status(err.innerError.errorType.httpCode).json({ error: err.innerError.errorType.message });
        }else{
            res.status(err.errorType.httpCode).json({ error: err.errorType.message });
        }
        return;
    }
    console.error("when error is not defined:", err);
    res.status(700).json({ error: "General error" });
}

let isServerDown = ( req, res, next) => {

    const fromCache = cacheModule.extractUserDataFromCache(req);
    if(fromCache === undefined || fromCache[0] === undefined || fromCache[0].id === undefined){
        console.log('im i here?----error handler');
        console.log('fromCache', fromCache)
        if(req.url.includes("/users") && req.method !== 'DELETE'){
            return next(); 
        }
        return res.status(606).json({ error: "A Problem Occurred And You Are Currently Not Logged-In" });
    }  
    return next(); 
}


module.exports = {
    errorHandler,
    isServerDown
}