import { ContactsTable } from './components/contacts-table';

const Contacts = () => {
  return (
    <div className='w-full space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Contacts</h1>
        <p className='text-muted-foreground text-sm'>
          View and search contact enquiries submitted through the platform.
        </p>
      </div>

      <ContactsTable />
    </div>
  );
};

export default Contacts;
