import { useState, useRef, useEffect } from 'react';
import './style.css';
import { uploadImage } from '@services/cloudinaryService';

interface ProfilePhotoProps {
  imageProfile?: string;
  canUpload?: boolean;
  setField?: (field: string, value: any) => void;
}

const DEFAULT_AVATAR = '/images/avatar.jpg';

const ProfilePhoto = ({ imageProfile, canUpload = false, setField }: ProfilePhotoProps) => {
  const [image, setImage] = useState(imageProfile || DEFAULT_AVATAR);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = await uploadImage(file);

      if (imageUrl) {
        setImage(imageUrl);
        setField && setField('fotoPerfil', imageUrl);
      }
    }
  };

  useEffect(() => {
    setImage(imageProfile || DEFAULT_AVATAR);
  }, [imageProfile]);

  return (
    <div
      className="profile-container"
      onClick={() => canUpload && fileInputRef.current?.click()}
      style={{ cursor: canUpload ? 'pointer' : 'default' }}
    >
      <div
        className="profile-picture"
        style={{
          backgroundImage: `url(${image})`,
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
