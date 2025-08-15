import {Open_Sans, Poppins} from 'next/font/google';

const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '700']
});

const poppins = Poppins({
    subsets:['latin'],
    weight: ['300', '400', '700', '900'],
});

export {openSans, poppins};