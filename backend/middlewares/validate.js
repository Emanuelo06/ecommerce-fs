
export const validate = (schema, property = "body") => {
    return (req, res, next) => {
        try{
            const data = schema.parse(req[property]);
            req[property] = data;
            next();
        } catch (err){
            return res.status(400).json({
                success: false,
                errors: err.errors.map(e => ({
                    path: e.path.join("."),
                    message: e.message
                }))
            });
        }
    }
}
