import { LoaderCircle } from 'lucide-react';

export default function Loading() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <LoaderCircle size={50} />
        </div>
    )
}