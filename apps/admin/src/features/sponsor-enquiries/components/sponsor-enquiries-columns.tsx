import type { SponsorEnquiryRes } from '@/api/generated/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LegacyColumnDef } from '@tanstack/react-table/legacy';
import type { TFunction } from 'i18next';
import { ArrowUpDown, Eye } from 'lucide-react';

interface GetSponsorEnquiriesColumnsOptions {
  t: TFunction<['sponsor-enquiries', 'common']>;
  onView: (enquiry: SponsorEnquiryRes) => void;
  onToggleCreatedSort: () => void;
}

export const getSponsorEnquiriesColumns = ({
  t,
  onView,
  onToggleCreatedSort,
}: GetSponsorEnquiriesColumnsOptions): LegacyColumnDef<SponsorEnquiryRes>[] => [
  {
    accessorKey: 'organizationName',
    header: t('columns.organization'),
    cell: ({ row }) => <span className='font-medium'>{row.original.organizationName}</span>,
  },
  {
    accessorKey: 'contactNameAndRole',
    header: t('columns.contact'),
    cell: ({ row }) => (
      <span className='block max-w-[180px] truncate' title={row.original.contactNameAndRole}>
        {row.original.contactNameAndRole}
      </span>
    ),
  },
  {
    accessorKey: 'workEmail',
    header: t('columns.workEmail'),
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.workEmail}`}
        className='text-muted-foreground hover:text-foreground underline-offset-4 hover:underline'
      >
        {row.original.workEmail}
      </a>
    ),
  },
  {
    accessorKey: 'sector',
    header: t('columns.sector'),
    cell: ({ row }) => (
      <span className='block max-w-[150px] truncate' title={row.original.sector}>
        {row.original.sector}
      </span>
    ),
  },
  {
    accessorKey: 'country',
    header: t('columns.country'),
  },
  {
    accessorKey: 'preferredSponsorshipLevel',
    header: t('columns.level'),
    cell: ({ row }) => <Badge variant='secondary'>{row.original.preferredSponsorshipLevel}</Badge>,
  },
  {
    accessorKey: 'boothRequirement',
    header: t('columns.booth'),
    cell: ({ row }) => (
      <Badge variant='outline'>{row.original.boothRequirement.replaceAll('_', ' ')}</Badge>
    ),
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
          aria-label={t('actions.viewEnquiry', { organization: row.original.organizationName })}
          onClick={() => onView(row.original)}
        >
          <Eye className='size-4' />
        </Button>
      </div>
    ),
  },
];
