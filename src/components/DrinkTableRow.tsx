import useImageUpload from "@/hooks/useImageUpload";
import { IDrink } from "@/types";
import { TableRow, TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from '../constant/queryKeys';
import Image from "next/image";
import styles from './DrinkTableRow.module.css';

interface Props {
  data: IDrink;
}

const DrinkTableRow = ({ data }: Props) => {
  const { imageUrl, initImageUrl, inputRef, previewImage, handleImageInput, uploadImage } = useImageUpload();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [calorie, setCalorie] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  const { mutate } = useMutation(async () => {
    await fetch(`/api/drinks/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        size,
        sugar,
        calorie,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  })

  useEffect(() => {
    if (data.imageUrl) {
      initImageUrl(data.imageUrl);
    }
    setName(data.name);
    setSize(data.size);
    setSugar(data.sugar);
    setCalorie(data.calorie);
  }, [])

  const handleEditDrinkImage = async () => {
    try {
      await uploadImage(`/drinks/${data.id}`);
      queryClient.invalidateQueries([queryKeys.DRINKS])
    } catch (e) {
      throw e;
    }
  }

  const edit = () => {
    setIsEditing(true);
  }

  const save = () => {
    setIsEditing(false);
    try {
      mutate();
      handleEditDrinkImage();
    } catch (e) {
      alert("다시 시도해주세요!");
    }
  }

  const onClick = () => {
    if (isEditing) {
      save();
    }
    else {
      edit();
    }
  }

  return (
    <TableRow>
      <TableCell>{data.id}</TableCell>
      <TableCell>
        <input value={name} disabled={!isEditing} onChange={(e) => {
          setName(e.target.value)
        }} />
      </TableCell>
      <TableCell>
        <input value={size} type="number" disabled={!isEditing} onChange={(e) => { setSize(Number(e.target.value)) }} />
      </TableCell>
      <TableCell>
        <input value={sugar} type="number" disabled={!isEditing} onChange={(e) => { setSugar(Number(e.target.value)) }} />
      </TableCell>
      <TableCell>
        <input value={calorie} type="number" disabled={!isEditing} onChange={(e) => { setCalorie(Number(e.target.value)) }} />
      </TableCell>
      <TableCell>
        <div>
          {imageUrl
            ?
            <Image src={imageUrl} width={100} height={100} alt='' />
            : '이미지 없음'
          }
          {
            isEditing &&
            <div className={styles.imageInputWrapper}>
              <input type="file" accept="image/*" onChange={handleImageInput} ref={inputRef} />
              {previewImage && <Image src={previewImage || ''} width={100} height={100} alt='' />}
            </div>
          }
        </div>
      </TableCell>
      <TableCell>{data.category}</TableCell>
      <TableCell>
        <button onClick={onClick}>{isEditing ? '저장하기' : '수정하기'}</button>
      </TableCell>
    </TableRow>
  )
}

export default DrinkTableRow;
