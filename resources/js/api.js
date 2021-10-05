import axios from 'axios'


// --------------------------------------------------------
// Ajax callback helper functions
// --------------------------------------------------------
function defaultConfig () {
    let authToken = window.localStorage.getItem('authToken');

    if (!authToken) {
        return {}
    }

    return {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    }
}

// --------------------------------------------------------
// Ajax shortcuts
// --------------------------------------------------------
export function get (url, params) {
    const config = Object.assign(defaultConfig(), {
        url: url,
        method: 'get',
        params: params
    })
    return axios.request(config)
        .then(successCallback)
        .catch(failureCallback)
}


export function post (url, data) {
    const config = Object.assign(defaultConfig(), {
        url: url,
        method: 'post',
        data: data
    })
    return axios.request(config)
        .then(successCallback)
        .catch(failureCallback)
}

export function deleteRequest (url, data) {
    const config = Object.assign(defaultConfig(), {
        url: url,
        method: 'delete',
        data: data
    })
    return axios.request(config)
        .then(successCallback)
        .catch(failureCallback)
}

export function put (url, data) {
    const config = Object.assign(defaultConfig(), {
        url: url,
        method: 'put',
        data: data
    })
    return axios.request(config)
        .then(successCallback)
        .catch(failureCallback)
}

// --------------------------------------------------------
// Ajax callbacks
// --------------------------------------------------------
function successCallback (response) {
    return response.data
}

function failureCallback (error) {
    const response = error.response

    // display the error message
    if (response.data.message) {
        let errorMessage = `${response.data.message} \n`

        if (response.data.errors) {
            for (let errorKey in response.data.errors) {
                for (error of response.data.errors[errorKey]) {
                    errorMessage += `${errorKey}: ${error} \n`
                }
            }
        }
        console.log(errorMessage)
        alert(errorMessage)
    } else {
        alert(`[ ${error.message} ] Please check your connection`)
    }

    return null
}
