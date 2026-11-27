import type { ContactRes } from '@/api/generated/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';

interface ViewContactProps {
  contact: ContactRes | null;
  onClose: () => void;
}

const ViewContact = ({ contact, onClose }: ViewContactProps) => {
  const { t } = useTranslation(['contacts', 'common']);

  return (
    <Dialog open={Boolean(contact)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{contact?.subject}</DialogTitle>
          <DialogDescription>
            {contact?.organization
              ? t('dialog.fromWithOrg', {
                  name: contact.name,
                  email: contact.email,
                  organization: contact.organization,
                })
              : t('dialog.from', {
                  name: contact?.name ?? '',
                  email: contact?.email ?? '',
                })}
          </DialogDescription>
        </DialogHeader>
        <div className='bg-muted/40 rounded-md border p-4 text-sm whitespace-pre-wrap'>
          {contact?.message}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewContact;
