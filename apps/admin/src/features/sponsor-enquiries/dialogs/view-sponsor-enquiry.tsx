import type { SponsorEnquiryRes } from '@/api/generated/client';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ViewSponsorEnquiryProps {
  enquiry: SponsorEnquiryRes | null;
  onClose: () => void;
}

const ViewSponsorEnquiry = ({ enquiry, onClose }: ViewSponsorEnquiryProps) => {
  return (
    <Dialog open={Boolean(enquiry)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <div className='flex flex-wrap items-center gap-2'>
            <DialogTitle>{enquiry?.organizationName}</DialogTitle>
            {enquiry?.preferredSponsorshipLevel && (
              <Badge variant='secondary'>{enquiry.preferredSponsorshipLevel}</Badge>
            )}
            {enquiry?.boothRequirement && (
              <Badge variant='outline'>{enquiry.boothRequirement.replaceAll('_', ' ')}</Badge>
            )}
          </div>
          <DialogDescription>
            {enquiry?.contactNameAndRole} ({enquiry?.workEmail}) · {enquiry?.phone}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-3 text-sm'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <span className='text-muted-foreground'>Sector: </span>
              <span>{enquiry?.sector}</span>
            </div>
            <div>
              <span className='text-muted-foreground'>Country: </span>
              <span>{enquiry?.country}</span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div>
              <span className='text-muted-foreground'>Agreed to contact: </span>
              <span>{enquiry?.agreedToContact ? 'Yes' : 'No'}</span>
            </div>
            {enquiry?.website && (
              <div className='truncate'>
                <span className='text-muted-foreground'>Website: </span>
                <a
                  href={enquiry.website}
                  target='_blank'
                  rel='noreferrer'
                  className='underline-offset-4 hover:underline'
                >
                  {enquiry.website}
                </a>
              </div>
            )}
          </div>

          {enquiry?.partnershipObjectives && (
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>Partnership Objectives</p>
              <div className='bg-muted/40 rounded-md border p-3 whitespace-pre-wrap'>
                {enquiry.partnershipObjectives}
              </div>
            </div>
          )}

          {enquiry?.additionalMessage && (
            <div className='space-y-1'>
              <p className='text-muted-foreground text-xs font-medium'>Additional Message</p>
              <div className='bg-muted/40 rounded-md border p-3 whitespace-pre-wrap'>
                {enquiry.additionalMessage}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSponsorEnquiry;
