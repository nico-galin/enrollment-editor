import { useRef, useState, useEffect } from 'react';
import type { RefObject } from 'react';
import * as htmlToImage from 'html-to-image';
import ConfigurationPane from './components/config-pane';
import Preview from './components/preview';
import { defaultData, type AppData } from './constants/default-data';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check, Loader2, Share2 } from 'lucide-react';

function Toolbar({
  previewRef,
}: {
  previewRef: RefObject<HTMLDivElement | null>;
}) {
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const captureOptions = { pixelRatio: 2, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT };

  const captureBlob = () => htmlToImage.toBlob(previewRef.current!, captureOptions);

  const canShare = typeof navigator.share === 'function';

  const handleShare = async () => {
    setCopying(true);
    try {
      const blob = await captureBlob();
      const file = new File([blob!], 'calcentral-academics.png', { type: 'image/png' });
      await navigator.share({ files: [file] });
    } finally {
      setCopying(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await captureBlob();
      const url = URL.createObjectURL(blob!);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'calcentral-academics.png';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    setCopying(true);
    try {
      const blob = await captureBlob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob! }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className='flex items-center gap-2 p-2 pr-3'>
      <h1 className='text-sm font-semibold mr-auto'>
        Enrollment Configuration
      </h1>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          className='h-7 text-xs gap-1.5'
          onClick={canShare ? handleShare : handleCopy}
          disabled={copying}
        >
          {copying ? (
            <Loader2 className='h-3.5 w-3.5 animate-spin' />
          ) : copied ? (
            <Check className='h-3.5 w-3.5 text-green-600' />
          ) : canShare ? (
            <Share2 className='h-3.5 w-3.5' />
          ) : (
            <Copy className='h-3.5 w-3.5' />
          )}
          {copied ? 'Copied!' : canShare ? 'Share' : 'Copy Image'}
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='h-7 text-xs gap-1.5'
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            <Loader2 className='h-3.5 w-3.5 animate-spin' />
          ) : (
            <Download className='h-3.5 w-3.5' />
          )}
          Download PNG
        </Button>
      </div>
    </div>
  );
}

const STORAGE_KEY = 'schedule-gen-data';

function loadPersistedData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AppData;
  } catch {
    // ignore parse errors
  }
  return defaultData;
}

const PREVIEW_WIDTH = 1395;
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH * 9 / 16);

function App() {
  const [data, setData] = useState<AppData>(loadPersistedData);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const [previewNaturalHeight, setPreviewNaturalHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const preview = previewRef.current;
    if (!container || !preview) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container) {
          setPreviewScale(entry.contentRect.width / PREVIEW_WIDTH);
        } else if (entry.target === preview) {
          setPreviewNaturalHeight(entry.contentRect.height);
        }
      }
    });
    observer.observe(container);
    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  const handleChange = (newData: AppData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // ignore quota exceeded errors (e.g. large photos)
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  };

  return (
    <div className='flex flex-col h-screen w-screen overflow-hidden bg-muted/40'>
      <Toolbar previewRef={previewRef} />
      <div className='flex flex-col md:flex-row flex-1 min-h-0'>
        <div className='flex flex-col md:flex-1 min-w-0 gap-2 md:pr-2 pb-2 order-first md:order-last overflow-hidden max-sm:mx-2'>
          <div
            ref={containerRef}
            className='rounded-xl border border-gray-200 overflow-hidden w-full'
            style={{ height: previewNaturalHeight * previewScale || undefined }}
          >
            <div
              style={{
                width: `${PREVIEW_WIDTH}px`,
                transform: `scale(${previewScale})`,
                transformOrigin: 'top left',
              }}
            >
              <Preview data={data} ref={previewRef} />
            </div>
          </div>
        </div>
        <ConfigurationPane
          data={data}
          onChange={handleChange}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

export default App;
