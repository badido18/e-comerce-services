function success(message, data) {
    return {
        message,
        data,
        isError: false
    }
}

function error(message) {
    return {
        message,
        data: null,
        isError: true
    }
}

module.exports = {
    success, error
}