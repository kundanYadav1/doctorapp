const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url)
    const pathname = req.url
    if (pathname === '/') {
        res.writeHead(200)
        res.end('Welcome to nims')
    } else if (pathname === '/eng') {
        res.writeHead(200)
        res.end('Welcome to NITE')
    } else if (pathname === '/medical') {
        res.writeHead(200)
        res.end('Welcome to Nims medical')
    } else {
        res.writeHead(404)
        res.end('Not found')
    }
})

server.listen(8000, () => {
    console.log('Started Nims server')
})
