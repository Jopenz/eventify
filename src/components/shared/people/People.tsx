import { FC } from 'react';
import Person from '../../../types/Person';
import Avatar from '../avatar/Avatar';
import './People.css';
import { IonBadge, IonText } from '@ionic/react';

interface PeopleProps {
  people: Person[];
  size?: 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
}

const People: FC<PeopleProps> = ({ className = '', size = 'md', people }) => {
  const colors = ['#4a98d4', '#e0c358'];

  return (
    <div className={`people ${size} ${className}`}>
      <div className='people-items'>
        {people.slice(0, 2).map((person, index) => (
          <Avatar key={person.id} name={person.name} size={40} src={`${person.avatar}${person.id}`} backgroundColor={colors[index]} />
        ))}
      </div>
      {people.length > 2 ? (
        <div className='people-count'>
          <IonBadge color='primary'>+{people.length - 2}</IonBadge>
        </div>
      ) : null}
    </div>
  );
};

export default People;
