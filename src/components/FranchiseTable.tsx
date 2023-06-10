import { Table, TableBody, TableContainer } from '@mui/material'
import React from 'react'
import FranchiseTableHeader from './FranchiseTableHeader'
import useFranchisesData from '@/hooks/queries/useFranchisesData'
import FranchiseTableRow from './FranchiseTableRow';

function FranchiseTable() {
  const { data } = useFranchisesData();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <TableContainer sx={{ minWidth: 800, maxWidth: 1200 }}>
        <Table>
          <FranchiseTableHeader />
          <TableBody>
            {data?.map((d) =>
              <FranchiseTableRow key={d.id} {...d} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default FranchiseTable;
