import { IonButton, IonIcon, IonItem, IonLabel, IonText, IonThumbnail } from '@ionic/react';
import { imageOutline, watch } from 'ionicons/icons';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface UploadImageProps {
  name: string;
  label: string;
}

const UploadImage: FC<UploadImageProps> = ({ name, label }) => {
  const { formState, register, watch, setValue } = useFormContext();
  const [file, setFile] = useState<File | null>(null);

  const { errors } = formState;

  const error = errors[name];
  const avatar = watch(name);

  useEffect(() => {
    let filereader = new FileReader();
    filereader.onload = (e) => {
      if (!e.target) return;
      setValue(name, e.target?.result?.toString() ?? '');
    };

    if (file) {
      filereader.readAsDataURL(file);
    }
  }, [file]);

  const fileOpenDialog = () => {
    const fileInput = document.getElementById(`${name}-input`);
    fileInput?.click();
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <IonItem lines='none'>
      <IonText color='danger'>
        <sub>{error?.message?.toString()}</sub>
      </IonText>
      <IonThumbnail slot='start'>
        <img alt='Silhouette of mountains' src={avatar || 'https://ionicframework.com/docs/img/demos/thumbnail.svg'} />
      </IonThumbnail>
      <input type='hidden' {...register(name)} />
      <input id={`${name}-input`} type='file' onChange={handleFileChange} accept='image/*' hidden />
      <IonButton slot='end' size='default' onClick={fileOpenDialog}>
        <IonIcon icon={imageOutline} slot='start'></IonIcon>
        {label}
      </IonButton>
    </IonItem>
  );
};

export default UploadImage;
