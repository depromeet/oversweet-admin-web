import { Table, TableBody, TableContainer } from '@mui/material'
import React, { useState } from 'react'
import TableHeader from './TableHeader';
import DrinkTableRow from './DrinkTableRow';
import { IDrink, TCreateDrinkDto } from '@/types';
import api from '@/services/api';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const headerLabel = ['id', '음료명', '사이즈(ml)', '당류(g)', '칼로리(kcal)', '이미지', '카테고리', '가장 작은 사이즈'];

interface Props {
  data: IDrink[];
  refetch: () => void;
}

function DrinkTable({ data, refetch }: Props) {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();
  const franchiseId = router.query.id as string;

  const { mutate } = useMutation(async ({ franchiseId, data }: { franchiseId: string, data: TCreateDrinkDto }) => {
    await api.post(`/franchises/${franchiseId}/drinks`, data);
  })

  const createNewDrink = (data: TCreateDrinkDto) => {
    setIsCreating(false);
    mutate({ franchiseId, data }, {
      onSuccess: () => {
        refetch();
      },
    });
  }

  const cancelCreate = () => {
    setIsCreating(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <TableContainer sx={{ minWidth: 800, maxWidth: 1200 }}>
        <Table>
          <TableHeader headers={headerLabel} addNewRow={() => { setIsCreating(true) }} />
          <TableBody>
            {isCreating && <DrinkTableRow isCreating handleCreate={createNewDrink} handleCancelCreate={cancelCreate} refetch={refetch} />}
            {data?.map((d) =>
              <DrinkTableRow key={d.id} data={d} refetch={refetch} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DrinkTable;
