const server = require('./api/server')

server.listen('9000',()=>{
    console.log('\x1b[32m',`Server listening on port 9000`,'\x1b[0m')
})