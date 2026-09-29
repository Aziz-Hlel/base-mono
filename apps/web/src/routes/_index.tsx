import type { Route } from './+types/_index';
import axios from 'axios';
import { useState } from 'react';

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

export function meta({}: Route.MetaArgs) {
  return [{ title: 'base-monorepo-v2' }, { name: 'description', content: 'base-monorepo-v2 is a web application' }];
}

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/');
      setData(response.data);
    } catch (error) {
      setError(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='container mx-auto max-w-3xl px-4 py-2'>
      <pre className='overflow-x-auto font-mono text-sm'>{TITLE_TEXT}</pre>
      <div className='grid gap-6'>
        <section className='rounded-lg border p-4'>
          <h2 className='mb-2 font-medium'>API Status</h2>
        </section>
      </div>
    </div>
  );
}
