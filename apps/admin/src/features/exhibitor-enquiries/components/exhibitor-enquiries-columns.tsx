import type { ExhibitorEnquiryRes } from '@/api/generated/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LegacyColumnDef } from '@tanstack/react-table/legacy';
import { ArrowUpDown, Eye } from 'lucide-react';

interface GetExhibitorEnquiriesColumnsOptions {
  onView: (enquiry: ExhibitorEnquiryRes) => void;
  onToggleCreatedSort: () => void;
}

export const getExhibitorEnquiriesColumns = ({
  onView,
  onToggleCreatedSort,
}: GetExhibitorEnquiriesColumnsOptions): LegacyColumnDef<ExhibitorEnquiryRes>[] => [
  {
    accessorKey: 'companyName',
    header: 'Company',
    cell: ({ row }) => <span className='font-medium'>{row.original.companyName}</span>,
  },
  {
    accessorKey: 'contactPerson',
    header: 'Contact Person',
    cell: ({ row }) => <span>{row.original.contactPerson}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
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
    header: 'Sector',
    cell: ({ row }) => (
      <span className='block max-w-[160px] truncate' title={row.original.sector}>
        {row.original.sector}
      </span>
    ),
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'preferredPackage',
    header: 'Package',
    cell: ({ row }) => <Badge variant='secondary'>{row.original.preferredPackage}</Badge>,
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
          aria-label={`View enquiry from ${row.original.companyName}`}
          onClick={() => onView(row.original)}
        >
          <Eye className='size-4' />
        </Button>
      </div>
    ),
  },
];
