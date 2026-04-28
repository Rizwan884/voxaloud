export default function AdBanner({ type }: { type: '728x90' | '320x50' | '300x250' | '160x600' | '160x300' | '468x60' | 'native' }) {
  const ads = {
    '728x90': { key: '5b5fb5a6602fbe88bd9e2330f7c9086c', w: 728, h: 90 },
    '320x50': { key: '39c51df9921f1d732a3eb5037a296cc1', w: 320, h: 50 },
    '300x250': { key: 'd3b3ab1a5e32de44294c69cd94cbeb2d', w: 300, h: 250 },
    '160x600': { key: '861a3eb39b6de8415ebaff04ea02495d', w: 160, h: 600 },
    '160x300': { key: 'a21a96a00e016db30c569de8c4c77830', w: 160, h: 300 },
    '468x60': { key: '404fa8594329f4699bae4d024d71548f', w: 468, h: 60 }
  };

  if (type === 'native') {
    const srcDoc = `
      <style>body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
      <script async="async" data-cfasync="false" src="https://pl29281939.profitablecpmratenetwork.com/baff9cf430798494cebb943dcd8b07c0/invoke.js"></script>
      <div id="container-baff9cf430798494cebb943dcd8b07c0"></div>
    `;
    return <iframe srcDoc={srcDoc} width="100%" height="250" className="border-0 overflow-hidden bg-transparent" scrolling="no" />;
  }

  const ad = ads[type];
  const srcDoc = `
    <style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;}</style>
    <script>
      atOptions = {
        'key' : '${ad.key}',
        'format' : 'iframe',
        'height' : ${ad.h},
        'width' : ${ad.w},
        'params' : {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/${ad.key}/invoke.js"></script>
  `;

  return (
    <div className={`flex justify-center items-center my-4 overflow-hidden bg-surface-2 rounded-xl`}>
      <iframe 
        srcDoc={srcDoc} 
        width={ad.w} 
        height={ad.h} 
        className="border-0 bg-transparent" 
        scrolling="no" 
      />
    </div>
  );
}
