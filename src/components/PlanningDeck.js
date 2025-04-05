import PlanningCard from './PlanningCard';

export default function PlanningDeck({ userRole, selectedValue, onSelectCard }) {
  // Definir los valores disponibles según el rol
  const getDeckValues = (role) => {
    switch (role) {
      case 'developer':
      case 'qa':
      case 'tech_lead':
        return ['0', '1', '2', '3', '5', '8', '13', '21'];
      case 'scrum_master':
      case 'business':
      case 'ux_designer':
        return ['coffee'];
      default:
        return [];
    }
  };

  const values = getDeckValues(userRole);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4 justify-center">
        {values.map((value) => (
          <PlanningCard
            key={value}
            value={value}
            isSelected={selectedValue === value}
            onClick={() => onSelectCard(value)}
          />
        ))}
        {userRole === 'developer' && (
          <PlanningCard
            value="question"
            isSelected={selectedValue === 'question'}
            onClick={() => onSelectCard('question')}
          />
        )}
      </div>
    </div>
  );
} 