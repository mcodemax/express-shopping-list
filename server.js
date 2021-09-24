const app = require('./app')

app.listen(3000, () => { //always have this at END of file, b/c need definied routes b4 you start listening
    console.log('Server running on port 3000')
});