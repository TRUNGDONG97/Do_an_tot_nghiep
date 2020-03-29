
const Test = (req, res, index) => {
  
    res.status(200).json({
        message: 'You are index page'
    })
}
module.exports = {
    test: Test
}
