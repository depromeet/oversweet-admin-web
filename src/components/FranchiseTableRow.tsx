import { IFranchise } from "@/types";
import { TableCell, TableRow } from "@mui/material"
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import * as queryKeys from '../constant/queryKeys';
import Image from "next/image";
import useImageUpload from "@/hooks/useImageUpload";

interface Props {
  data: IFranchise,
}

const FranchiseTableRow = ({ data }: Props) => {
  const router = useRouter();
  const { imageUrl, initImageUrl, inputRef, handleImageInput, uploadImage } = useImageUpload();
  const { id, name } = data;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data.imageUrl) {
      initImageUrl(data.imageUrl);
    }
  }, [data, initImageUrl])

  const handleEditFranchiseImage = async () => {
    try {
      await uploadImage(`/franchises/${id}`);
      queryClient.invalidateQueries([queryKeys.FRANCHISES]);
    } catch (e) {
      alert('다시 시도해주세요');
    }
  }
  const moveToDrinkList = () => {
    router.push(`/franchise/${id}/drinks`);
  }

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
