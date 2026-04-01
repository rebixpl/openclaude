// Helper script to read Windows clipboard in separate process
// This avoids blocking the main openclaude process

const clipboard = require('@mariozechner/clipboard');
const fs = require('fs');

async function main() {
  try {
    if (!clipboard.hasImage()) {
      process.stdout.write(JSON.stringify({ error: 'No image in clipboard' }));
      return;
    }

    const base64 = await clipboard.getImageBase64();
    if (!base64) {
      process.stdout.write(JSON.stringify({ error: 'Failed to get image' }));
      return;
    }

    process.stdout.write(JSON.stringify({ success: true, base64 }));
  } catch (e) {
    process.stdout.write(JSON.stringify({ error: e.message }));
  }
}

main();
