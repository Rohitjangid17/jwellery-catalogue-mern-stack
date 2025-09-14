// Utility functions for sending standardized success response
export const success = (res, data = {}, status = 200) => {
    return res.status(status).json({
        success: true,
        ...data,
    });
};

// Utility functions for sending standardized error response
export const error = (res, message = "Something went wrong", status = 500) => {
    return res.status(status).json({
        success: false,
        message,
    });
};