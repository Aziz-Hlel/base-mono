import type { ExhibitorEnquiryRes } from '@/api/generated/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LegacyColumnDef } from '@tanstack/react-table/legacy';
import type { TFunction } from 'i18next';
import { ArrowUpDown, Eye } from 'lucide-react';

interface GetExhibitorEnquiriesColumnsOptions {
  onView: (enquiry: ExhibitorEnquiryRes) => void;
  onToggleCreatedSort: () => void;
  t: TFunction<['exhibitor-enquiries', 'common']>;
}

export const getExhibitorEnquiriesColumns = ({
  onView,
  onToggleCreatedSort,
  t,
}: GetExhibitorEnquiriesColumnsOptions): LegacyColumnDef<ExhibitorEnquiryRes>[] => [
  {
    accessorKey: 'companyName',
    header: t('columns.company'),
    cell: ({ row }) => <span className='font-medium'>{row.original.companyName}</span>,
  },
  {
    accessorKey: 'contactPerson',
    header: t('columns.contactPerson'),
    cell: ({ row }) => <span>{row.original.contactPerson}</span>,
  },
  {
    accessorKey: 'email',
    header: t('columns.email'),
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        className='text-muted-foreground hover:text-foreground underline-offset-4 hover:underline'
      >
        {row.original.email}
      </a>
    ),
  },
  {
    accessorKey: 'sector',
    header: t('columns.sector'),
    cell: ({ row }) => (
      <span className='block max-w-[160px] truncate' title={row.original.sector}>
        {row.original.sector}
      </span>
    ),
  },
  {
    accessorKey: 'country',
    header: t('columns.country'),
  },
  {
    accessorKey: 'preferredPackage',
    header: t('columns.package'),
    cell: ({ row }) => <Badge variant='secondary'>{row.original.preferredPackage}</Badge>,
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <Button variant='ghost' size='sm' className='-ml-2 h-8 px-2' onClick={onToggleCreatedSort}>
        {t('common:table.received')}
        <ArrowUpDown className='ml-1.5 size-3.5' />
      </Button>
    ),
    cell: ({ row }) => (
      <span className='text-muted-foreground text-xs'>
        {new Date(row.original.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </span>
    ),
  },
  {
    id: 'actions',
    header: () => <span className='sr-only'>{t('common:table.actions')}</span>,
    cell: ({ row }) => (
      <div className='flex justify-end'>
        <Button
          variant='ghost'
          size='icon-sm'
          aria-label={t('actions.viewEnquiry', { companyName: row.original.companyName })}
          onClick={() => onView(row.original)}
        >
          <Eye className='size-4' />
        </Button>
      </div>
    ),
  },
];
