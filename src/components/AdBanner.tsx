export default function AdBanner({ type }: { type: '728x90' | '320x50' | '300x250' | '160x600' | '160x300' | '468x60' | 'native' }) {
  const ads = {
    '728x90': { key: 'd3749f5b9a84ef088012c7ef8ffbc1ce', w: 728, h: 90 },
    '320x50': { key: '2efd3ceb94d31ebcf1e09cde46ebb5fc', w: 320, h: 50 },
    '300x250': { key: '6c21d3d4c8e6b91b19f8dc18565c1b79', w: 300, h: 250 },
    '160x600': { key: 'b90175167d7ee365225672538bb8bbea', w: 160, h: 600 },
    '160x300': { key: 'c1eeb49abe4c994149fce5c73d49992b', w: 160, h: 300 },
    '468x60': { key: 'fdcbd12a736d4a1164c3981eae791fd2', w: 468, h: 60 }
  };

  if (type === 'native') {
    const srcDoc = `
      <style>body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
      <script async="async" data-cfasync="false" src="https://pl29585427.effectivecpmnetwork.com/2a41359e68ff14c9d105434dff8272a9/invoke.js"></script>
      <div id="container-2a41359e68ff14c9d105434dff8272a9"></div>
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
    <div className="flex justify-center items-center my-4 overflow-hidden bg-surface-2 rounded-xl">
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
