// Standalone test for Windows clipboard
import { getImageFromClipboard } from './src/utils/imagePaste.js';

async function test() {
  console.log('Platform:', process.platform);
  console.log('Testing getImageFromClipboard...');

  try {
    const result = await getImageFromClipboard();
    console.log('Result:', result);

    if (result) {
      console.log('✓ SUCCESS! Got image');
      console.log('  Media type:', result.mediaType);
      console.log('  Base64 length:', result.base64?.length);
      console.log('  Dimensions:', result.dimensions);
    } else {
      console.log('✗ No image returned (clipboard empty or no image)');
    }
  } catch (e) {
    console.error('✗ Error:', e);
    console.error(e.stack);
  }
}

test();
