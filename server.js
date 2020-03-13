const cp = require('child_process');
const path = require('path');

const start = () => {
  const child = cp.fork(path.join(__dirname, 'start.js'));
  child.on('message', data => {
    if (data === 'restart') {
      child.kill('SIGINT');
      start();
    }
  });
  
  child.on('exit', code => code && process.exit(code));
};

start();