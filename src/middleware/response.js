export const response = (res, { 
    status = true, 
    message = "Success", 
    code = 200, 
    data = null, 
    error = null 
} = {}) => {
    const result = {
        code,
        status,
        message,
        ...(data && { data }), // Add `data` only if it exists
        ...(error && { error }) // Add `error` only if it exists
    };
    res.status(code).json(result);
};
