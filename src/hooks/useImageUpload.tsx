import api from "@/services/api";
import axios from "axios";
import { useRef, useState } from "react";

const uploadImageToS3 = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const { data } = await axios.post('/api/uploadImage', formData);
    const url = data.url;
    await axios.put(url, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      }
    });
    return url.split('?')[0];
  } catch (e) {
    throw new Error('failed to upload image to s3');
  }
}

const useImageUpload = () => {
  const [imageInput, setImageInput] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageInput(event.target.files[0]);
    }
  };

  const initImageUrl = (imageUrl: string) => {
    setImageUrl(imageUrl);
  }

  const uploadImage = async (url: string) => {
    try {
      if (imageInput) {
        const imageUrl = await uploadImageToS3(imageInput);
        await api.patch(url, {
          imageUrl,
        })
        setImageUrl(imageUrl);
        setImageInput(null);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    } catch (e) {
      throw e;
    }
  }

  return { handleImageInput, initImageUrl, uploadImage, imageUrl, inputRef }
}

export default useImageUpload;
