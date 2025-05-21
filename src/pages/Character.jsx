import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const user = {
  name: 'John Doe',
  age: 30,
  occupation: 'Adventurer',
  bio: 'Loves exploring new worlds and taking on challenges.',
};

const Character = () => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: theme?.background,
        color: theme?.color,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        className="bg-white rounded-xl shadow-md p-8 min-w-[280px] max-w-[350px] w-full"
        style={{
          background: theme?.infoBoxBackground || '#f9f9f9',
        }}
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Character</h2>
        <div className="mb-3">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-3">
          <strong>Age:</strong> {user.age}
        </div>
        <div className="mb-3">
          <strong>Occupation:</strong> {user.occupation}
        </div>
        <div>
          <strong>Bio:</strong> {user.bio}
        </div>
      </div>
    </div>
  );
};

export default Character;
