import type { ExhibitorEnquiryRes } from '@/api/generated/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { getCoreRowModel, useLegacyTable } from '@tanstack/react-table/legacy';
import { useDebounce } from '@uidotdev/usehooks';
import { ChevronLeft, ChevronRight, RefreshCw, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ViewExhibitorEnquiry from '../dialogs/view-exhibitor-enquiry';
import { useExhibitorEnquiries } from '../hooks/use-exhibitor-enquiries';
import { getExhibitorEnquiriesColumns } from './exhibitor-enquiries-columns';

export const ExhibitorEnquiriesTable = () => {
  const { t } = useTranslation(['exhibitor-enquiries', 'common']);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [searchInput, setSearchInput] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ExhibitorEnquiryRes | null>(null);

  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isLoading, isFetching, isError, error, refetch } = useExhibitorEnquiries({
    page,
    size,
    search: debouncedSearch,
    sortBy: 'createdAt',
    order,
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);
  const totalElements = pagination?.totalElements ?? 0;

  const columns = useMemo(
    () =>
      getExhibitorEnquiriesColumns({
        onView: setSelectedEnquiry,
        onToggleCreatedSort: () => {
          setOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
          setPage(1);
        },
        t,
      }),
    [t],
  );

  const table = useLegacyTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  return (
    <div className='w-full space-y-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='relative w-full sm:max-w-sm'>
          <Search className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className='pl-9'
          />
        </div>

        <Button variant='outline' size='sm' onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`mr-2 size-4 ${isFetching ? 'animate-spin' : ''}`} />
          {t('common:actions.refresh')}
        </Button>
      </div>

      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {columns.map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className='h-4 w-full max-w-[160px]' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-32 text-center'>
                  <div className='flex flex-col items-center gap-2'>
                    <p className='text-destructive text-sm'>
                      {error instanceof Error ? error.message : t('errors.loadFailed')}
                    </p>
                    <Button variant='outline' size='sm' onClick={() => refetch()}>
                      {t('common:actions.tryAgain')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='text-muted-foreground h-32 text-center'
                >
                  {t('empty')}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-muted-foreground text-sm'>
          {t('pagination.total', { count: totalElements })}
        </p>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground text-sm'>{t('common:pagination.rows')}</span>
            <Select
              value={String(size)}
              onValueChange={(value) => {
                setSize(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger className='h-8 w-[72px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='50'>50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground text-sm'>
              {t('common:pagination.pageOf', { page, totalPages })}
            </span>
            <Button
              variant='outline'
              size='icon-sm'
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label={t('common:pagination.previousPage')}
            >
              <ChevronLeft className='size-4' />
            </Button>
            <Button
              variant='outline'
              size='icon-sm'
              disabled={page >= totalPages || isFetching}
              onClick={() => setPage((p) => p + 1)}
              aria-label={t('common:pagination.nextPage')}
            >
              <ChevronRight className='size-4' />
            </Button>
          </div>
        </div>
      </div>

      <ViewExhibitorEnquiry enquiry={selectedEnquiry} onClose={() => setSelectedEnquiry(null)} />
    </div>
  );
};
