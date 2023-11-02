
const {spawn} = require("child_process")
const path = require("path")


const terminal = spawn(path.join(__dirname , "/Interpretor.exe") , ["./testing.squig"])

terminal.stdout.on("data" , (data)=>{
    console.log(`${data}`)
})