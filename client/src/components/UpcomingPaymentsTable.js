import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useTable } from 'react-table';
import React, { useMemo } from 'react';

const UpcomingPaymentsTable = (props) => {
  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, []);
  const data = useMemo(() => tableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        mt={10}
        mb={10}
        pt={10}
        pb={10}
        pr={5}
        pl={5}
        bg='#fff'
      >
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()} pe='0px'>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color='gray.800'
                    >
                      {column.render('Header')}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} _hover={{ bg: 'gray.100' }}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()} fontSize='16'>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};

export default UpcomingPaymentsTable;
