const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  // homem page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Home page</h1>");
    res.end();

    // about page
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About page</h1");
    res.end();

    // 404 => Not found page
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Page not found</h1>");
    res.end();
  }
});

server.listen(5000);

// ako gledas od youtube-a onda nastavljas od 4:32:06
