"use client";

import React from 'react';
import ComingSoon from '@/components/shared/ComingSoon';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function FinancesPage() {
  return (
    <DashboardLayout>
      <ComingSoon pageTitle="Finances" />
    </DashboardLayout>
  );
}
