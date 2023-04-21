import '@/styles/globals.css';
import { wrapper } from '@/redux/store';
import type { AppProps } from 'next/app';
import Header from '@/components/header';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }: AppProps) {
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: any) => {
      const x = e.clientX - 16
      const y = e.clientY - 16
      setCursorXY({ x, y })
     }
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, []);

  return (
    <div className='bg-gradient-to-r from-gray-700 via-gray-900 to-black h-full min-h-screen cursor-none'>
       <div
            className=" hidden lg:block z-30 animate-text bg-gradient-to-r from-stone-50 via-zinc-500 to-slate-800 fixed left-0 top-0 w-12 h-12 rounded-full pointer-events-none"
            style={{
                transform: `translate3d(${cursorXY.x}px, ${cursorXY.y}px, 0)`,
            }}
        ></div>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(App)
