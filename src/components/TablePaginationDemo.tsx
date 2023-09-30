'use client';
import React from 'react';
import { useCallback, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Data } from '@/types';

interface TablePaginationDemoProps {
  data: Data;
}

const TablePaginationDemo: React.FC<TablePaginationDemoProps> = (props) => {
  const { data } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page: number = +searchParams.get('page')! || 0;
  const limit: number = +searchParams.get('limit')! || 10;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: any
  ) => {
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    router.push(pathname + '?' + createQueryString('limit', value));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const urlPage = searchParams.get('page');
    const urlLimit = searchParams.get('limit');

    if (!urlPage && !urlLimit) {
      router.push(
        pathname +
          '?' +
          createQueryString('page', '0') +
          '&' +
          createQueryString('limit', limit.toString())
      );
    }
  }, [createQueryString, limit, pathname, router, searchParams]);

  return (
    <TablePagination
      component='div'
      count={data.count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default TablePaginationDemo;
