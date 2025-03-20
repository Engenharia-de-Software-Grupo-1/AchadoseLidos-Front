import { useState, useRef } from 'react';
import './style.css';

interface ProfilePhotoProps {
  imageProfile: string;
  canUpload?: boolean;
}

const ProfilePhoto = ({ imageProfile, canUpload = false }: ProfilePhotoProps) => {
  const [image, setImage] = useState(imageProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      setImage(newImage);
    }
  };

  return (
    <div
      className="profile-container"
      onClick={() => canUpload && fileInputRef.current?.click()}
      style={{ cursor: canUpload ? 'pointer' : 'default' }}
    >
      <div
        className="profile-picture"
        style={{
          backgroundImage: canUpload ? `linear-gradient(rgba(169, 169, 169, 0.5), rgba(169, 169, 169, 0.5)), url(${image})` : `url(${imageProfile})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        {canUpload && <i className="pi pi-pencil icon-image" />}
      </div>
      {canUpload && (
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageUpload}
        />
      )}
    </div>
  );
};

export default ProfilePhoto;
