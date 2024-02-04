import { FC } from 'react';
import './Text.css';
import { IonText } from '@ionic/react';

export interface Text {
  className?: string;
  color?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  children: React.ReactNode;
}

export interface TitleProps extends Text {}

export interface CaptionProps extends Text {}

export const Title: FC<TitleProps> = ({ children, className, color = 'inherit', size = 'md' }) => {
  return (
    <IonText color={color} className={className}>
      <h4 className={`text-title ${size}`}>{children}</h4>
    </IonText>
  );
};

export const Caption: FC<CaptionProps> = ({ children, className, color = 'inherit', size = 'md' }) => {
  return (
    <IonText color={color} className={className}>
      <p className={`text-caption ${size}`}>{children}</p>
    </IonText>
  );
};
