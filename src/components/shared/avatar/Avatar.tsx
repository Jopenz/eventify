import React, { FC } from 'react';
import { IonAvatar } from '@ionic/react';
import './Avatar.css';

export interface AvatarProps extends TextAvatarProps {
  src?: string;
}

export interface TextAvatarProps {
  name: string;
  size?: number;
  backgroundColor: string;
  onPress?: () => void;
}

export interface ImageAvatarProps {
  src: string;
  size?: number;
  onPress?: () => void;
}

const ImageAvatar: FC<ImageAvatarProps> = ({ src, size = 50, onPress }) => {
  return (
    <IonAvatar className='ion-avatar' style={{ width: size, height: size }} onClick={onPress}>
      <img alt="Silhouette of a person's head" src={src} />
    </IonAvatar>
  );
};

const TextAvatar: FC<TextAvatarProps> = ({ name, size = 50, backgroundColor, onPress }) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const getContrastColor = (hexColor: string): string => {
    let r;
    let g;
    let b;

    const hexColorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

    const match = hexColorRegex.exec(hexColor);

    if (match) {
      r = parseInt(match[1], 16);
      g = parseInt(match[2], 16);
      b = parseInt(match[3], 16);
    } else if (hexColor.length === 4) {
      r = parseInt(hexColor[1] + hexColor[1], 16);
      g = parseInt(hexColor[2] + hexColor[2], 16);
      b = parseInt(hexColor[3] + hexColor[3], 16);
    } else {
      return '#000000';
    }

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const textColor = getContrastColor(backgroundColor);
  const fontSize = size / 2;

  return (
    <IonAvatar className='ion-avatar' style={{ width: size, height: size }}>
      <div className='avatar-text' style={{ backgroundColor, width: size, height: size, color: textColor, fontSize: fontSize }} onClick={onPress}>
        <span>{initials}</span>
      </div>
    </IonAvatar>
  );
};

const Avatar: FC<AvatarProps> = ({ onPress, name, size, src, backgroundColor }) => {
  if (src) {
    return <ImageAvatar src={src} size={size} onPress={onPress} />;
  }

  return <TextAvatar name={name} size={size} backgroundColor={backgroundColor} onPress={onPress} />;
};

export default Avatar;
