import { useTranslation } from 'react-i18next';
import { ContactsTable } from './components/contacts-table';

const Contacts = () => {
  const { t } = useTranslation(['contacts', 'common']);

  return (
    <div className='w-full space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground text-sm'>{t('subtitle')}</p>
      </div>

      <ContactsTable />
    </div>
  );
};

export default Contacts;
