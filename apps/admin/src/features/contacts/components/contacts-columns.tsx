import type { ContactRes } from '@/api/generated/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { LegacyColumnDef } from '@tanstack/react-table/legacy';
import type { TFunction } from 'i18next';
import { ArrowUpDown, Eye } from 'lucide-react';

interface GetContactsColumnsOptions {
  t: TFunction<['contacts', 'common']>;
  onView: (contact: ContactRes) => void;
  onToggleCreatedSort: () => void;
}

export const getContactsColumns = ({
  t,
  onView,
  onToggleCreatedSort,
}: GetContactsColumnsOptions): LegacyColumnDef<ContactRes>[] => [
  {
    accessorKey: 'name',
    header: t('columns.name'),
    cell: ({ row }) => <span className='font-medium'>{row.original.name}</span>,
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
    accessorKey: 'organization',
    header: t('columns.organization'),
    cell: ({ row }) =>
      row.original.organization ? (
        <Badge variant='secondary'>{row.original.organization}</Badge>
      ) : (
        <span className='text-muted-foreground'>—</span>
      ),
  },
  {
    accessorKey: 'subject',
    header: t('columns.subject'),
    cell: ({ row }) => (
      <span className='block max-w-96 truncate' title={row.original.subject}>
        {row.original.subject}
      </span>
    ),
  },
  {
    accessorKey: 'message',
    header: t('columns.message'),
    cell: ({ row }) => (
      <span className='text-muted-foreground block max-w-65 truncate' title={row.original.message}>
        {row.original.message}
      </span>
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
          aria-label={t('actions.viewMessageAria', { name: row.original.name })}
          onClick={() => onView(row.original)}
        >
          <Eye className='size-4' />
        </Button>
      </div>
    ),
  },
];
