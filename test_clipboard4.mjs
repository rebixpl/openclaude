import { spawn } from 'child_process';

console.log('Testing clipboard with @echo off...\n');

const cmd = spawn('cmd.exe', ['/c', '@echo off && powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; exit ([int][System.Windows.Forms.Clipboard]::ContainsImage())"'], {
  windowsHide: true
});

let stdout = '';
let stderr = '';

cmd.stdout.on('data', (data) => {
  stdout += data;
});

cmd.stderr.on('data', (data) => {
  stderr += data;
});

cmd.on('close', (code) => {
  console.log('Exit code:', code);
  console.log('Stdout:', stdout);
  console.log('Stderr:', stderr);
  if (code === 0) {
    console.log('\n✅ Image found!');
  } else {
    console.log('\n❌ No image (or error)');
  }
});
