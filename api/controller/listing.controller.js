import { errorHandler } from "../utils/error";

export const createListing = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, "you can only create listing in your account"));
    try {
        
    } catch (error) {
        next(error)
    }
};