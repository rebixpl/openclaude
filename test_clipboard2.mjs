import { execSync } from 'child_process';

console.log('Testing clipboard with child_process...\n');

try {
  const result = execSync(
    'powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; exit ([int][System.Windows.Forms.Clipboard]::ContainsImage())"',
    { encoding: 'utf8', shell: true }
  );
  console.log('Result:', result);
  console.log('Image found!');
} catch (e) {
  console.log('Exit code:', e.status);
  console.log('Stdout:', e.stdout);
  console.log('Stderr:', e.stderr);
  console.log('No image found');
}
