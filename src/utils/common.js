function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateTime = year + month + day + hours + minutes + seconds;
  return dateTime;
}

function base64EncodeString(str) {
  //return  Buffer.from(str).toString("base64");
  return encodeURI(Buffer.from(str.toString()).toString('base64'));
}
function base64DecodeString(str) {
  let buff = new Buffer.from(str, 'base64');
  return decodeURI(buff.toString('ascii'));
}

module.exports = {
  getCurrentDateTime,
  base64EncodeString,
  base64DecodeString
};
