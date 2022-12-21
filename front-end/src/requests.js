function getRequest(uri, params, responseHandler) {
    const extendedUri = uri + "?" + new URLSearchParams(params).toString();
    fetch(extendedUri, { method: 'GET' }).then((res) => res.status == 200 ? responseHandler(res) : errorHandler(res)).catch((err) => console.log(err));
}

function postRequest(uri, data, responseHandler) {
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(uri, req).then((res) => res.status == 200 ? responseHandler(res) : errorHandler(res)).catch((err) => console.log(err));
}

function patchRequest(uri, data, responseHandler) {
    const req = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(uri, req).then((res) => res.status == 200 ? responseHandler(res) : errorHandler(res)).catch((err) => console.log(err));
}

function putRequest(uri, data, responseHandler) {
    const req = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(uri, req).then((res) => res.status == 200 ? responseHandler(res) : errorHandler(res)).catch((err) => console.log(err));
}

function deleteRequest(uri, data, responseHandler) {
    const req = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(uri, req).then((res) => res.status == 200 ? responseHandler(res) : errorHandler(res)).catch((err) => console.log(err));
}

async function errorHandler(err) {
    alert(`Error: ${(await err.json()).description}`);
}

module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.putRequest = putRequest;
module.exports.patchRequest = patchRequest;
module.exports.deleteRequest = deleteRequest;
