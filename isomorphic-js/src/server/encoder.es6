import crypto from 'crypto';

function encode(encodingWord){
  let cipher = crypto.createCipher('aes192', encodingWord);
  cipher.update('shin0123', 'utf8', 'hex');
  let encodedText = cipher.final('hex');
  console.log("encodedText",encodedText);
  return encodedText;
}

// function decode(username, password){
//   var decipher = crypto.createDecipher('aes192', passowrd);
//   decipher.update(username, 'hex', 'utf8');
//   var dec = decipher.final('utf8');
// }

export default {
  encode
}
