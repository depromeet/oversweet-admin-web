import { Table, TableBody, TableContainer } from '@mui/material'
import React from 'react'
import useFranchisesData from '@/hooks/queries/useFranchisesData'
import FranchiseTableRow from './FranchiseTableRow';
import TableHeader from './TableHeader';

const headerLabel = ['id', '이름', '이미지', '이미지 수정하기', '음료 리스트 보러가기'];

function FranchiseTable() {
  const { data } = useFranchisesData();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <TableContainer sx={{ minWidth: 800, maxWidth: 1200 }}>
        <Table>
          <TableHeader headers={headerLabel} />
          <TableBody>
            {data?.map((d) =>
              <FranchiseTableRow key={d.id} data={d} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default FranchiseTable;
