const home = (req, res) => {
    res.status(200).json({
        status : "success",
        message : "Hello ,This is polling System Api"
    })
}

export {home}