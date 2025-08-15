import { poppins } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Logo() {
  return (
    <div
      className={`${poppins.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        alt="Logo"
        src="/logo.png"
        width={523}
        height={427}
        className="mx-auto h-10 w-auto"
      />
      <p className="text-[clamp(1.5rem,2vw,2rem)]">Salary Fit</p>
    </div>
  );
}
