exports.getUserInfo = function(request) {
    return {
        username: request.body.username,
        password: request.body.password,
        role    : request.body.role || 'Member',
    }
}
