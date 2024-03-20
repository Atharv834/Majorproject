class ExpressError extends Error {
    constructor(status ,message){
        super();
        this.status=status;
        this.message= message;
    }
}
    
module.exports= ExpressError;

/*  Express error inherits the properties from the default error class used in express    */