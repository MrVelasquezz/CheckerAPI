module.exports = () => {
    const date = new Date()
    const tmsg = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return tmsg
}