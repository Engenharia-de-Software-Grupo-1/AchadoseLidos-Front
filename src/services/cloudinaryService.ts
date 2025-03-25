/// <reference types="vite/client" />

export const uploadImage = async (file: File): Promise<string | null> => {
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error('Erro ao obter URL da imagem:', data);
      return null;
    }
  } catch (error) {
    console.error('Erro ao fazer upload para Cloudinary:', error);
    return null;
  }
};

export const uploadImagesToCloudinary = async (imageList: File[]): Promise<string[]> => {
  const uploadedImages = [];
  for (const file of imageList) {
    const imageUrl = await uploadImage(file);
    if (imageUrl) uploadedImages.push(imageUrl);
  }
  return uploadedImages;
};
