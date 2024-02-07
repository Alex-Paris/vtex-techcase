export function base64ToBinary(base64String: string): ArrayBuffer {
  const binaryString = atob(base64String)
  const length = binaryString.length
  const bytes = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes.buffer
}
