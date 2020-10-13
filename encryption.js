const CryptoJS = require("crypto-js");


module.exports = encryptionValue=(value, secretCode)=>{
    console.log("here", value);
    var cipherText = CryptoJS.AES.encrypt(value, secretCode).toString();
    return cipherText;
}


module.exports = decryptionValue = (value)=>{
    var byteText = CryptoJS.AES.decrypt(value, secretCode);
    var decryptedValue = byteText.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
};
