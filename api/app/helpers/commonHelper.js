const fs = require('fs')
const env = process.env
exports.siteName = ()=>{
    return process.env.APP_NAME;
}

exports.getBaseurl = () =>{
    return env.APP_URL;
}
exports.siteUrl = () =>{
    return "localhost";
}
exports.getFileExtension = (filename) =>
{
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}
exports.prepareUploadFolder = (path) => {
  const pathExist = fs.existsSync (path)
  if (!pathExist) {
    fs.mkdirSync(path, {
      recursive: true
    })
  }
}