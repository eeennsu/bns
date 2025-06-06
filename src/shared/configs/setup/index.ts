'use client';

import { useEffect } from 'react';

import setupDayjs from './dayjs';

const ClientSetup = () => {
  useEffect(() => {
    setupDayjs();
  }, []);

  return null;
};

export default ClientSetup;
