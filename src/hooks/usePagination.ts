import { useState, useMemo } from 'react';
import { PAGE_SIZE } from '../lib/constants';

export function usePagination<T>(data: T[], pageSize = PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const total = Math.ceil(data.length / pageSize);
  const slice = useMemo(() => data.slice((page - 1) * pageSize, page * pageSize), [data, page, pageSize]);
  return { page, setPage, total, slice, count: data.length };
}
