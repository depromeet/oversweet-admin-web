import { IFranchise } from "@/types";
import { TableCell, TableRow } from "@mui/material"
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import * as queryKeys from '../constant/queryKeys';
import api from "@/services/api";
import Image from "next/image";

interface Props {
  data: IFranchise,
}

const FranchiseTableRow = ({ data }: Props) => {
  const router = useRouter();
  const { id, name } = data;
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.imageUrl) {
      setImageUrl(data.imageUrl);
    }
  }, [data])

  const moveToDrinkList = () => {
    router.push(`/franchise/${id}/drinks`);
  }

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleEditFranchiseImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      try {
        const { data } = await axios.post('/api/uploadImage', formData);
        const url = data.url;
        await axios.put(url, selectedImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          }
        });
        await api.patch(`/franchises/${id}`, {
          imageUrl: url.split('?')[0],
        });
        queryClient.invalidateQueries([queryKeys.FRANCHISES]);
        setImageUrl(url.split('?')[0]);

        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setSelectedImage(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        {imageUrl
          ?
          <Image src={imageUrl} width={100} height={100} alt='' />
          : '이미지 없음'
        }
      </TableCell>
      <TableCell>
        <input type="file" accept="image/*" onChange={handleImageInput} ref={inputRef} />
        <button onClick={handleEditFranchiseImage}>Upload Image</button>
      </TableCell>
      <TableCell>
        <button onClick={moveToDrinkList}>음료 리스트</button>
      </TableCell>
    </TableRow>
  )
}

export default FranchiseTableRow;
