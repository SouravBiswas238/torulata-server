exports.OK = (res, data, message, status = true) => {
    res.status(200).json({
        status,
        message: message || "OK",
        data: data,
    });
};

exports.ERROR = (res, data, message, status = false) => {
    res.status(500).json({
        status,
        message: message || "Internal Server Error",
        data: data,
    });
};
