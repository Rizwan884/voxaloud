// Advanced data stream protection for Fish Audio Online
// Tethers decryption to the official domain

const _K = [0x66, 0x69, 0x73, 0x68, 0x61, 0x75, 0x64, 0x69, 0x6f]; // "fishaudio"

const _D = ["shaaddev.studio", "fishaudio.online"];

export function formatStream(data: string | Buffer): string {
  const buf = typeof data === 'string' ? Buffer.from(data, 'utf-8') : (Buffer.isBuffer(data) ? data : Buffer.from(data as any));
  const out = new Uint8Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    let b = buf[i];
    // Layer 1: XOR with dynamic key
    b = (b ^ _K[i % _K.length]) ^ ((i * 17) % 256);
    // Layer 2: Nibble swap
    b = ((b << 4) | (b >> 4)) & 0xFF;
    // Layer 3: Final obfuscation
    out[i] = b ^ 0x3A;
  }
  return Buffer.from(out).toString('base64');
}

export function parseStream(b64: string, asString: boolean = false): unknown {
  if (typeof window !== 'undefined') {
    const h = window.location.hostname;
    if (!_D.some(d => h.includes(d)) && !h.includes('localhost') && !h.includes('127.0.0.1')) {
      return asString ? "[]" : new Uint8Array();
    }
  }

  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    let b = raw.charCodeAt(i) ^ 0x3A;
    // Reverse nibble swap
    b = ((b << 4) | (b >> 4)) & 0xFF;
    // Reverse XOR
    b = (b ^ _K[i % _K.length]) ^ ((i * 17) % 256);
    out[i] = b;
  }
  
  if (asString) {
    try {
      return new TextDecoder().decode(out);
    } catch {
      return "[]";
    }
  }
  return out;
}
