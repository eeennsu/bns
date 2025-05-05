'use client';

import { useState, type FC } from 'react';

import LoginDialog from './eindex';

const AdminEntryPoint: FC = () => {
  const [count, setCount] = useState<number>(0);

  return count > 2 && <LoginDialog onClose={() => setCount(0)} />;
};

export default AdminEntryPoint;
