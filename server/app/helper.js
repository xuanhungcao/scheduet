exports.getUserInfo = function(request) {
    return {
        username: request.body.username,
        role    : request.body.role || 'Member',
    }
}
