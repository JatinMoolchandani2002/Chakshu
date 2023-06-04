const fs = require("fs")
const path = require("path")

const createRootPath = (rootPath)=>{
    fs.writeFileSync(
        path.join(__dirname, ".", ".env"),
        `ROOTPATH=${rootPath}\n`
    );
    console.log("Root Path saved to .env file")
}

if (require.main === module) {
    if (process.argv.length === 3) {
      createRootPath(
        process.argv[2]
      );
    }
    else{
      console.log("Provide the following argument: Root Folder Path")
      process.exit(1)
    }
}