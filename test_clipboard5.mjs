import { execSync } from 'child_process';

console.log('Testing clipboard with batch file...\n');

try {
  const result = execSync('check_clipboard.bat', { 
    encoding: 'utf8',
    cwd: 'E:\\Coding_Projects\\vibecoding\\openclaude_test\\openclaude_src'
  });
  console.log('Result:', result);
  console.log('Image found!');
} catch (e) {
  console.log('Exit code:', e.status);
  console.log('Image not found');
}
