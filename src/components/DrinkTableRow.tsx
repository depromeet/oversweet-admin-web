import useImageUpload, { uploadImageToS3 } from "@/hooks/useImageUpload";
import { IDrink, TCreateDrinkDto } from "@/types";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from '../constant/queryKeys';
import Image from "next/image";
import styles from './DrinkTableRow.module.css';
import CategorySelector from "./CategorySelector";
import api from "@/services/api";
import { drinkCategoryKeys, drinkCategoryMap } from "@/constant/mappingTable";
interface Props {
  data?: IDrink;
  isCreating?: boolean;
  handleCreate?: (data: TCreateDrinkDto) => void;
  handleCancelCreate?: () => void;
  refetch?: () => void;
}

const DrinkTableRow = ({ data, isCreating, handleCreate, handleCancelCreate, refetch }: Props) => {
  const { imageUrl, initImageUrl, imageInput, inputRef, previewImage, handleImageInput, uploadImage } = useImageUpload();
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [calorie, setCalorie] = useState(0);
  const [category, setCategory] = useState('');
  const [isMinimum, setIsMinimum] = useState(false);

  const [isEditing, setIsEditing] = useState(isCreating ?? false);

  const { mutate: updateDrink } = useMutation(async () => {
    if (data) {
      if (imageInput) {
        await uploadImage(`/drinks/${data.id}`);
      }
      await api.put(`/drinks/${data.id}`, {
        name,
        size,
        sugar,
        calorie,
        category,
        isMinimum,
      });
    }
  }, {
    onSuccess: () => {
      console.log('하하')
      refetch?.();
    },
    onError: (error: Error) => {
      console.log(error)
      alert(`음료의 사이즈, 칼로리, 당 정보는 0 이하일 수 없습니다.`);
    }
  })

  useEffect(() => {
    if (data) {
      if (data.imageUrl) {
        initImageUrl(data.imageUrl);
      }
      setName(data.name);
      setSize(data.size);
      setSugar(data.sugar);
      setCalorie(data.calorie);
      setCategory(data.category);
      setIsMinimum(data.isMinimum);
    }
  }, [])

  useEffect(() => {
    if (isCreating) {
      setCategory('AMERICANO');
    }
  }, [isCreating])

  const edit = () => {
    setIsEditing(true);
  }

  const update = () => {
    setIsEditing(false);
    updateDrink();
  }

  const handleSave = async () => {
    if (isCreating && handleCreate) {
      const uploadedImgUrl = imageInput && await uploadImageToS3(imageInput) || '';
      handleCreate({
        name,
        size,
        sugar,
        calorie,
        isMinimum,
        category: category as drinkCategoryKeys,
        imageUrl: uploadedImgUrl,
      })
    }
    else if (isEditing) {
      update();
    }
    else {
      edit();
    }
  }

  const handleCancel = () => {
    if (isCreating && handleCancelCreate) {
      handleCancelCreate();
    } else {
      setIsEditing(false);
    }
  }

  return (
    <TableRow sx={{ height: '180px' }}>
      <TableCell width={10}>{data ? data.id : ''}</TableCell>
      <TableCell>
        <input value={name} disabled={!isEditing} onChange={(e) => {
          setName(e.target.value)
        }} />
      </TableCell>
      <TableCell>
        <input value={size} type="number" disabled={!isEditing} onChange={(e) => { setSize(Number(e.target.value)) }} style={{ width: '50px' }} />
      </TableCell>
      <TableCell>
        <input value={sugar} type="number" disabled={!isEditing} onChange={(e) => { setSugar(Number(e.target.value)) }} style={{ width: '50px' }} />
      </TableCell>
      <TableCell>
        <input value={calorie} type="number" disabled={!isEditing} onChange={(e) => { setCalorie(Number(e.target.value)) }} style={{ width: '50px' }} />
      </TableCell>
      <TableCell>
        <div>
          {!isEditing &&
            <div>
              {imageUrl
                ?
                <Image src={imageUrl} width={100} height={100} alt='' />
                : '이미지 없음'
              }
            </div>
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
      <TableCell>
        {
          isEditing
            ?
            <CategorySelector
              selectedCategory={category}
              handleChange={(value) => setCategory(value)}
            />
            :
            data ? drinkCategoryMap[data.category] : ''
        }
      </TableCell>
      <TableCell>
        <Checkbox checked={isMinimum} disabled={!isEditing} onChange={(e) => setIsMinimum(e.target.checked)} />
      </TableCell>
      <TableCell>
        <button onClick={handleSave}>{(isEditing || isCreating) ? '저장' : '수정'}</button>
        {(isEditing || isCreating) && <button onClick={handleCancel}>취소</button>}
      </TableCell>
    </TableRow>
  )
}

export default DrinkTableRow;
