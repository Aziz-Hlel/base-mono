import { useTranslation } from 'react-i18next';
import { SponsorEnquiriesTable } from './components/sponsor-enquiries-table';

const SponsorEnquiries = () => {
  const { t } = useTranslation(['sponsor-enquiries', 'common']);

  return (
    <div className='w-full space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground text-sm'>{t('subtitle')}</p>
      </div>

      <SponsorEnquiriesTable />
    </div>
  );
};

export default SponsorEnquiries;
