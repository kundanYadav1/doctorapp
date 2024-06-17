const { error } = require('console')
const file = require('fs')

function read(filename) {
    return new Promise((resolve, reject) => {
        file.readFile(filename, "utf-8", (error, data)=> {
            if (error)
                reject(error)
            resolve(data)
        })
    })
}

read("./text1.txt").then(res => {
    console.log(res)
    return read ("./text2.txt")
}).then(res => {
    console.log(res)
    return read("./text3.txt")
}).then(res => {
    return console.log(res)
}).catch(error => {
    console.log(error)
})

