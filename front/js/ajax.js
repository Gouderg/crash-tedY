'use strict';

function ajaxRequest(type, url, callback, data = null) {
    // Creqte XML HTTP request.
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    // Add onload function.
    xhr.onload = () => {
        switch(xhr.status) {
            case 200:
            case 201: console.log(xhr.responseText);
                break;
            
            default: httpErrors(xhr.status)

        }
    };

    // Send XML HTTP request.
    xhr.send();
}

function httpErrors(errorCode) {

    let msg = "";
    switch(errorCode) {
        case 400:
            msg = "HTTP/1.1 400 Bad Request";
            break;
        
        case 401:
            msg = "HTTP/1.1 401 Unauthorized";
            break;
        
        case 403:
            msg = "HTTP/1.1 403 Forbidden";
            break;
        
        case 404:
            msg = "HTTP/1.1 404 Not Found";
            break;
        
        case 500:
            msg = "HTTP/1.1 500 Internal Server Error";
            break;
        
        case 503:
            msg = "HTTP/1.1 503 Service Unavailable";
            break;
        
        default: msg = "Unknown error";
    }
    console.log(msg);
}