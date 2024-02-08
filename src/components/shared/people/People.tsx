import { FC } from 'react';
import Person from '../../../types/Person';
import Avatar from '../avatar/Avatar';
import './People.css';
import { IonBadge, IonText } from '@ionic/react';

interface PeopleProps {
  people: Person[];
  size?: 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
  label?: string;
}

const People: FC<PeopleProps> = ({ className = '', size = 'md', people, label }) => {
  const colors = ['#4a98d4', '#e0c358'];

  if (people.length === 0) return <div></div>;

  return (
    <div className='flex flex-col'>
      {label ? <IonText>{label}</IonText> : null}
      <div className='people-items'>
        {people.slice(0, 2).map((person, index) => (
          <Avatar key={person.id} name={person.name} size={40} src={`${person.avatar}`} backgroundColor={colors[index]} />
        ))}
        {people.length > 2 && <IonBadge color='primary'>+{people.length - 2}</IonBadge>}
      </div>
    </div>
  );
};

export default People;
