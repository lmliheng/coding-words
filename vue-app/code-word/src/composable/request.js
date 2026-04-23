import api from './axio_config'
function requestContribution() {
    return api({
        method: 'get',
        url: '/api/rankings/contribution'
    })
}
function requestHotSearch() {
    return api({
        method: 'get',
        url: '/api/rankings/hot-search'
    })
}



// userInfo
function requestUserInfo() {
    return api({
        method: 'get',
        url: '/api/auth/check-auth'
    })
}
// word
function requestWordInfo(word_id) {
    return api({
        method: 'get',
        url: '/api/Onlyword/word/' + word_id
    })
}

export default {
    requestContribution,
    requestHotSearch,
    requestUserInfo,
    requestWordInfo
}