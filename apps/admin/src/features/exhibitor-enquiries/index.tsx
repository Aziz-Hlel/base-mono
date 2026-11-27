import { ExhibitorEnquiriesTable } from './components/exhibitor-enquiries-table';

const ExhibitorEnquiries = () => {
  return (
    <div className='w-full space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Exhibitor Enquiries</h1>
        <p className='text-muted-foreground text-sm'>
          View and search exhibitor enquiries submitted through the platform.
        </p>
      </div>

      <ExhibitorEnquiriesTable />
    </div>
  );
};

export default ExhibitorEnquiries;
