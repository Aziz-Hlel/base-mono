import type { ContactRes } from '@/api/generated/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ViewContactProps {
  contact: ContactRes | null;
  onClose: () => void;
}

const ViewContact = ({ contact, onClose }: ViewContactProps) => {
  return (
    <Dialog open={Boolean(contact)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{contact?.subject}</DialogTitle>
          <DialogDescription>
            From {contact?.name} ({contact?.email})
            {contact?.organization ? ` — ${contact.organization}` : ''}
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
