import { Table, TableBody, TableContainer } from '@mui/material'
import React from 'react'
import TableHeader from './TableHeader';
import DrinkTableRow from './DrinkTableRow';
import { IDrink } from '@/types';

const headerLabel = ['id', '음료명', '사이즈(ml)', '당류(g)', '칼로리(kcal)', '이미지', '카테고리', ''];

interface Props {
  data: IDrink[];
}

function DrinkTable({ data }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <TableContainer sx={{ minWidth: 800, maxWidth: 1200 }}>
        <Table>
          <TableHeader headers={headerLabel} />
          <TableBody>
            {data?.map((d) =>
              <DrinkTableRow key={d.id} data={d} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DrinkTable;
