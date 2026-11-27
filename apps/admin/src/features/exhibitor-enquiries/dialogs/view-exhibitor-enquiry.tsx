import type { ExhibitorEnquiryRes } from '@/api/generated/client';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useTranslation } from 'react-i18next';

interface ViewExhibitorEnquiryProps {
  enquiry: ExhibitorEnquiryRes | null;
  onClose: () => void;
}

const ViewExhibitorEnquiry = ({ enquiry, onClose }: ViewExhibitorEnquiryProps) => {
  const { t } = useTranslation(['exhibitor-enquiries', 'common']);

  return (
    <Dialog open={Boolean(enquiry)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <div className='flex items-center gap-2'>
            <DialogTitle>{enquiry?.companyName}</DialogTitle>
            {enquiry?.preferredPackage && (
              <Badge variant='secondary'>{enquiry.preferredPackage}</Badge>
            )}
          </div>
          <DialogDescription>
            {enquiry?.contactPerson} ({enquiry?.email}) · {enquiry?.phone}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-3 text-sm'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <span className='text-muted-foreground'>{t('dialog.sector')}: </span>
              <span>{enquiry?.sector}</span>
            </div>
            <div>
              <span className='text-muted-foreground'>{t('dialog.country')}: </span>
              <span>{enquiry?.country}</span>
            </div>
          </div>

          {enquiry?.companyWebsite && (
            <div>
              <span className='text-muted-foreground'>{t('dialog.website')}: </span>
              <a
                href={enquiry.companyWebsite}
                target='_blank'
                rel='noreferrer'
                className='underline-offset-4 hover:underline'
              >
                {enquiry.companyWebsite}
              </a>
            </div>
          )}

          {enquiry?.companyDescription && (
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>
                {t('dialog.companyDescription')}
              </p>
              <div className='bg-muted/40 rounded-md border p-3 whitespace-pre-wrap'>
                {enquiry.companyDescription}
              </div>
            </div>
          )}

          {enquiry?.technicalRequirements && (
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>
                {t('dialog.technicalRequirements')}
              </p>
              <div className='bg-muted/40 rounded-md border p-3 whitespace-pre-wrap'>
                {enquiry.technicalRequirements}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewExhibitorEnquiry;
