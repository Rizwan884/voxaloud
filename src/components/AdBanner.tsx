export default function AdBanner({ 
  type,
  label = false 
}: { 
  type: '728x90' | '320x50' | '300x250' | '300x600' | '160x600' | '160x300' | '468x60' | 'native' | 'responsive';
  label?: boolean;
}) {
  const ads = {
    '728x90': { key: 'd3749f5b9a84ef088012c7ef8ffbc1ce', w: 728, h: 90 },
    '320x50': { key: '2efd3ceb94d31ebcf1e09cde46ebb5fc', w: 320, h: 50 },
    '300x250': { key: '6c21d3d4c8e6b91b19f8dc18565c1b79', w: 300, h: 250 },
    '300x600': { key: 'a6b328a9b2d354a7df1e0a2df3d85bc9', w: 300, h: 600 },
    '160x600': { key: 'b90175167d7ee365225672538bb8bbea', w: 160, h: 600 },
    '160x300': { key: 'c1eeb49abe4c994149fce5c73d49992b', w: 160, h: 300 },
    '468x60': { key: 'fdcbd12a736d4a1164c3981eae791fd2', w: 468, h: 60 }
  };

  if (type === 'responsive') {
    return (
      <div className="w-full flex flex-col items-center justify-center my-6">
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/60 mb-2">
            Advertisement
          </span>
        )}
        <div className="hidden md:block">
          <AdBanner type="728x90" label={false} />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" label={false} />
        </div>
      </div>
    );
  }

  if (type === 'native') {
    const srcDoc = `
      <style>body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
      <script async="async" data-cfasync="false" src="https://pl29585427.profitableratecpmnetwork.com/2a41359e68ff14c9d105434dff8272a9/invoke.js"></script>
      <div id="container-2a41359e68ff14c9d105434dff8272a9"></div>
    `;
    return (
      <div className="w-full flex flex-col items-center justify-center my-6">
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/60 mb-2">
            Sponsored
          </span>
        )}
        <iframe
          srcDoc={srcDoc}
          width="100%"
          height="250"
          className="border-0 overflow-hidden bg-transparent rounded-xl max-w-4xl"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    );
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
    <script src="https://www.highrevenueformat.com/${ad.key}/invoke.js"></script>
  `;

  return (
    <div className="flex flex-col items-center justify-center my-3">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/60 mb-1">
          Advertisement
        </span>
      )}
      <div className="overflow-hidden bg-surface-2/60 border border-border/60 rounded-xl p-1 shadow-sm">
        <iframe
          srcDoc={srcDoc}
          width={ad.w}
          height={ad.h}
          className="border-0 bg-transparent block"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
