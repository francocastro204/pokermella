export default function PokerCard({ suit, value }) {
  const getSuitColor = (suit) => {
    return suit === '♥' || suit === '♦' ? 'text-red-600' : 'text-black';
  };

  return (
    <div className="w-24 h-36 bg-white rounded-lg shadow-lg border-2 border-gray-300 flex flex-col p-2">
      <div className={`text-xl font-bold ${getSuitColor(suit)}`}>
        {value}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <span className={`text-4xl ${getSuitColor(suit)}`}>
          {suit}
        </span>
      </div>
      <div className={`text-xl font-bold ${getSuitColor(suit)} rotate-180`}>
        {value}
      </div>
    </div>
  );
} 