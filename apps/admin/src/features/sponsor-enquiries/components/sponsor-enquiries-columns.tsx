import type { SponsorEnquiryRes } from '@/api/generated/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LegacyColumnDef } from '@tanstack/react-table/legacy';
import { ArrowUpDown, Eye } from 'lucide-react';

interface GetSponsorEnquiriesColumnsOptions {
  onView: (enquiry: SponsorEnquiryRes) => void;
  onToggleCreatedSort: () => void;
}

export const getSponsorEnquiriesColumns = ({
  onView,
  onToggleCreatedSort,
}: GetSponsorEnquiriesColumnsOptions): LegacyColumnDef<SponsorEnquiryRes>[] => [
  {
    accessorKey: 'organizationName',
    header: 'Organization',
    cell: ({ row }) => <span className='font-medium'>{row.original.organizationName}</span>,
  },
  {
    accessorKey: 'contactNameAndRole',
    header: 'Contact',
    cell: ({ row }) => (
      <span className='block max-w-[180px] truncate' title={row.original.contactNameAndRole}>
        {row.original.contactNameAndRole}
      </span>
    ),
  },
  {
    accessorKey: 'workEmail',
    header: 'Work Email',
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
    header: 'Sector',
    cell: ({ row }) => (
      <span className='block max-w-[150px] truncate' title={row.original.sector}>
        {row.original.sector}
      </span>
    ),
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'preferredSponsorshipLevel',
    header: 'Level',
    cell: ({ row }) => <Badge variant='secondary'>{row.original.preferredSponsorshipLevel}</Badge>,
  },
  {
    accessorKey: 'boothRequirement',
    header: 'Booth',
    cell: ({ row }) => (
      <Badge variant='outline'>{row.original.boothRequirement.replaceAll('_', ' ')}</Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <Button variant='ghost' size='sm' className='-ml-2 h-8 px-2' onClick={onToggleCreatedSort}>
        Received
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
    header: () => <span className='sr-only'>Actions</span>,
    cell: ({ row }) => (
      <div className='flex justify-end'>
        <Button
          variant='ghost'
          size='icon-sm'
          aria-label={`View enquiry from ${row.original.organizationName}`}
          onClick={() => onView(row.original)}
        >
          <Eye className='size-4' />
        </Button>
      </div>
    ),
  },
];
