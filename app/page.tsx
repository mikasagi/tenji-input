import BrailleInput from './components/BrailleInput';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <div className="bg-gray-200 text-black">
      <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-start min-h-screen ml-8 gap-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="w-full flex justify-center">
            <h1 className="text-xl">点字入力・翻訳</h1>
          </div>
          <BrailleInput />
          <Toaster position="top-center" duration={1500} richColors />
        </main>
      </div>
    </div>
  );
}
