'use client'
import { SessionProvider } from 'next-auth/react';
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import Header from '../components/Header';
import WeatherWidget from '../components/WeatherWidget';
import CropInformation from '../components/CropInformation';
import MarketPrices from '../components/MarketPrices';

export default function Home({ Component, pageProps }) {
  const { data: session } = useSession();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // You can save the user's preference in local storage or a cookie here.
  };

  return (
    <SessionProvider session={pageProps.session}>
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Head>
        <title>Your Agricultural App</title>
        {/* Other head elements like meta tags, favicon, etc. */}
      </Head>

      <Header
        session={session}
        signIn={() => signIn('your-auth-provider')}
        signOut={() => signOut({ callbackUrl: '/' })}
        toggleDarkMode={toggleDarkMode}
      />

      <main>
        <WeatherWidget />
        <CropInformation />
        <MarketPrices />
      </main>

      <footer>
        {/* Your footer content */}
      </footer>
    </div>
    </SessionProvider>
  );
}
