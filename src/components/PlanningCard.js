export default function PlanningCard({ value, isSelected = false, onClick }) {
  const getDisplayValue = (val) => {
    if (val === 'coffee') return '☕';
    if (val === 'question') return '?';
    return val;
  };

  return (
    <div 
      onClick={onClick}
      className={`w-24 h-36 bg-white rounded-lg shadow-lg border-2 
        ${isSelected ? 'border-blue-500' : 'border-gray-300'} 
        flex flex-col p-2 cursor-pointer hover:border-blue-300 transition-colors`}
    >
      <div className="text-xl font-bold text-black">
        {getDisplayValue(value)}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-4xl font-['Press_Start_2P'] text-black">
          {getDisplayValue(value)}
        </span>
      </div>
      <div className="text-xl font-bold text-black rotate-180">
        {getDisplayValue(value)}
      </div>
    </div>
  );
} 