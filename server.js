var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postdata = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunck) {
           postdata += postDataChunck;
            console.log("Received POST data chunck '" +
                postDataChunck + "'.");
        });

        route.addListener("end", function () {
           route(handle, pathname, response, postdata);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;