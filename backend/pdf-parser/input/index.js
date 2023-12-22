var fs = require('fs');


function getTerminalInput (subArrays) {

  return new Promise((resolve, reject) => {
    const output = [];
    if (process.stdin.isTTY) {

      const path = process.argv.slice(2);
      const input = fs.readdirSync(path[0])

      input.forEach((file, index) => {
        input[index] = path + file
      })

      const len = Math.min(subArrays, Math.ceil(input.length / subArrays));

      while (input.length) {
        output.push(input.splice(0, len));
      }

      resolve(output);

    } else {
    
      let input = '';
      process.stdin.setEncoding('utf-8');

      process.stdin.on('readable', () => {
        let chunk;
        while (chunk = process.stdin.read())
          input += chunk;
      });

      process.stdin.on('end', () => {
        input = input.trim().split('\n');

        const len = Math.min(input.length, Math.ceil(input.length / subArrays));

        while (input.length) {
          output.push(input.splice(0, len));
        }

        resolve(output);
      })
    
    }
    
  });



}

module.exports = {
  getTerminalInput
};
