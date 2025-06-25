'use client';

import { useState, useRef } from 'react';
import BrailleDot from './BrailleDot';
import * as brailleMap from './brailleHelper';
import { Copy, Delete } from 'lucide-react';
import { toast } from 'sonner';

export default function BrailleInput() {
  const [dots, setDots] = useState<boolean[]>(Array(6).fill(false));
  const [brailleText, setBrailleText] = useState('');

  const toggleDot = (index: number) => {
    const newDots = [...dots];
    newDots[index] = !newDots[index];
    setDots(newDots);
  };

  const addBraille = () => {
    const brailleChar = brailleMap.brailleFromDots(dots);
    setBrailleText((prev) => prev + brailleChar);
    setDots(Array(6).fill(false));
  };

  const deleteTail = () => {
    setBrailleText((prev) => prev.slice(0, -1));
  };

  const copyToClipboard = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success('コピーしました。');
    }
  };

  return (
    <div className="flex flex-col  items-start gap-2 touch-manipulation">
      <div className="flex items-end">
        <div className="grid grid-cols-2 gap-1 mr-4 ml-4 border-2 border-gray-800 rounded-md p-2 ">
          {[0, 3, 1, 4, 2, 5].map((i) => (
            <BrailleDot key={i} active={dots[i]} onClick={() => toggleDot(i)} />
          ))}
        </div>

        <button
          onClick={addBraille}
          className="bg-blue-400 text-white w-20 h-12 text-2xl rounded hover:bg-blue-600 mr-1 ml-1"
        >
          Add
        </button>

        <button
          onClick={deleteTail}
          className="w-12 h-8 ml-4 bg-red-400 hover:bg-red-600 rounded flex items-center justify-center"
          aria-label="Delete"
        >
          <Delete size={30} color="white" />
        </button>

      </div>

      <div className="flex justify-between items-end ml-1">
        <span className="text-sm font-semibold text-gray-700">点字テキスト</span>
        <button
          onClick={() => {copyToClipboard(brailleText)}}
          className="p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="コピー"
        >
          <Copy size={16} />
        </button>
      </div>
      <textarea
        className="sixbraille_p border border-black rounded w-80 h-20 p-2 text-base tracking-wider font-mono bg-gray-200 resize-none"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        value={brailleText}
        readOnly
        onFocus={(e) => e.target.select()}
      />
      
      <div className="flex justify-between items-end ml-1">
        <span className="text-sm font-semibold text-gray-700">日本語テキスト</span>
        <button
          onClick={() => {copyToClipboard(brailleMap.transrateBraille(brailleText))}}
          className="p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="コピー"
        >
          <Copy size={16} />
        </button>
      </div>
      <textarea
        className="border border-black rounded w-80 h-20 p-2 text-base tracking-wider font-mono bg-gray-200 resize-none"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        value={brailleMap.transrateBraille(brailleText)}
        readOnly
        onFocus={(e) => e.target.select()}
      />
    </div>
  );
}