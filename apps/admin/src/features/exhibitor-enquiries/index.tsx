import { useTranslation } from 'react-i18next';
import { ExhibitorEnquiriesTable } from './components/exhibitor-enquiries-table';

const ExhibitorEnquiries = () => {
  const { t } = useTranslation(['exhibitor-enquiries', 'common']);

  return (
    <div className='w-full space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground text-sm'>{t('subtitle')}</p>
      </div>

      <ExhibitorEnquiriesTable />
    </div>
  );
};

export default ExhibitorEnquiries;
