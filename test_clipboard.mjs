import { execa } from 'execa';

async function testClipboard() {
  console.log('Testing clipboard access from Node.js...\n');
  
  // Test 1: Check if image exists
  const checkCmd = 'powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; exit ([int][System.Windows.Forms.Clipboard]::ContainsImage())"';
  console.log('Running check command...');
  const checkResult = await execa(checkCmd, { shell: true, reject: false });
  console.log('Check result:', {
    exitCode: checkResult.exitCode,
    stdout: checkResult.stdout,
    stderr: checkResult.stderr
  });
  
  if (checkResult.exitCode === 0) {
    console.log('\n✅ Image detected in clipboard!');
  } else {
    console.log('\n❌ No image in clipboard (exit code:', checkResult.exitCode + ')');
  }
}

testClipboard().catch(console.error);
