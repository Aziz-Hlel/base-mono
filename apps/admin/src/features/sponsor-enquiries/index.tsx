import { SponsorEnquiriesTable } from './components/sponsor-enquiries-table';

const SponsorEnquiries = () => {
  return (
    <div className='w-full space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Sponsor Enquiries</h1>
        <p className='text-muted-foreground text-sm'>
          View and search sponsor enquiries submitted through the platform.
        </p>
      </div>

      <SponsorEnquiriesTable />
    </div>
  );
};

export default SponsorEnquiries;
