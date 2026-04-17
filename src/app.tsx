import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import * as htmlToImage from 'html-to-image';
import ConfigurationPane from './config-pane';
import Preview from './components/preview';
import { defaultData, type AppData } from './default-data';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check, Loader2 } from 'lucide-react';

function Toolbar({
  previewRef,
}: {
  previewRef: RefObject<HTMLDivElement | null>;
}) {
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const capture = () =>
    htmlToImage.toPng(previewRef.current!, { pixelRatio: 2 });

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const dataUrl = await capture();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'calcentral-academics.png';
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    setCopying(true);
    try {
      const blob = await htmlToImage.toBlob(previewRef.current!, {
        pixelRatio: 2,
      });
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
    <div className='flex items-center gap-2'>
      <div className='ml-auto flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          className='h-7 text-xs gap-1.5'
          onClick={handleCopy}
          disabled={copying}
        >
          {copying ? (
            <Loader2 className='h-3.5 w-3.5 animate-spin' />
          ) : copied ? (
            <Check className='h-3.5 w-3.5 text-green-600' />
          ) : (
            <Copy className='h-3.5 w-3.5' />
          )}
          {copied ? 'Copied!' : 'Copy Image'}
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

function App() {
  const [data, setData] = useState<AppData>(loadPersistedData);
  const previewRef = useRef<HTMLDivElement>(null);

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
    <div className='flex h-screen w-screen overflow-hidden bg-muted/40'>
      <ConfigurationPane data={data} onChange={handleChange} onReset={handleReset} />
      <div className='flex flex-col flex-1 min-w-0 gap-2 pr-2 pb-2 pt-2'>
        <Toolbar previewRef={previewRef} />
        <div className='flex-1 rounded-xl border border-gray-200 overflow-y-auto overflow-x-hidden w-full max-w-[1400px]'>
          <Preview data={data} ref={previewRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
