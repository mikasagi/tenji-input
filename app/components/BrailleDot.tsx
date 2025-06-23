'use client';

type BrailleDotProps = {
  active: boolean;
  onClick: () => void;
};

export default function BrailleDot({active, onClick }: BrailleDotProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full border border-black m-1 
        ${ active ? 'bg-black' : 'bg-gray-200'}`
      }
    >
    </button>
  );
}