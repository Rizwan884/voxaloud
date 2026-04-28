// Utilities for data stream processing
// We use these to format data chunks safely

const M_K = 0xA7; // Magic constant for chunk alignment

export function formatStream(data: string | Buffer): string {
  let buf: Buffer;
  if (typeof data === 'string') {
    buf = Buffer.from(data, 'utf-8');
  } else {
    buf = data;
  }
  
  const out = new Uint8Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    // Obfuscate bytes
    out[i] = ~(buf[i] ^ ((M_K + i * 3) % 256));
  }
  return Buffer.from(out).toString('base64');
}

export function parseStream(b64: string, asString: boolean = false): any {
  // Runs in browser
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    const byte = raw.charCodeAt(i);
    // De-obfuscate
    out[i] = (~byte) ^ ((M_K + i * 3) % 256);
  }
  
  if (asString) {
    return new TextDecoder().decode(out);
  }
  return out;
}
