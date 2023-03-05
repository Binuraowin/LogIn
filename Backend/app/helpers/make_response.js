const STATUS_TEXTS = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    INVALID_PARAMETERS: 422,
    DEPENDENCY_SERVICE_FAILURE: 424,
    E_RATE_LIMIT_EXCEEDED: 429,
    SERVER_ERROR: 500,
};

exports.makeResponse = (res, status, success, data, message) => {
    status = typeof status === "string" ? STATUS_TEXTS[status] : status;
    const dataToSend = {
        status: status,
        success: success,
        data: data,
        message: message,
        service: "LogIn",
    };
    if (res.req.external_service_status) {
        dataToSend.external_service_status = res.req.external_service_status;
    }
    if ((status !== 200 || !success)) {
        console.log("[MAKE_RESPONSE] - SUCCESS_FALSE")
    }
    res.status(status).send(dataToSend);
};