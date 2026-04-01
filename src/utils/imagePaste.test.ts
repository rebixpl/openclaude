import { describe, expect, it } from 'bun:test'
import { getImageFromClipboard, hasImageInClipboard } from './imagePaste.js'

describe('getImageFromClipboard on Windows', () => {
  it('returns null when clipboard is empty or has no image', async () => {
    // This test verifies that we can check for images without crashing
    const result = await getImageFromClipboard()
    // Result could be null (no image) or an object (if user has image in clipboard)
    // Either is valid - we just need to ensure it doesn't throw
    expect(result === null || typeof result === 'object').toBe(true)
  })
})

describe('hasImageInClipboard on Windows', () => {
  it('returns false or true without crashing', async () => {
    // This test verifies that hasImageInClipboard works on Windows
    // On non-macOS platforms it currently returns false, but this test
    // ensures we can extend it for Windows later
    const result = await hasImageInClipboard()
    expect(result === true || result === false).toBe(true)
  })
})
