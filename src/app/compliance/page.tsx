"use client";

import React from 'react';
import ComingSoon from '@/components/shared/ComingSoon';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function CompliancePage() {
  return (
    <DashboardLayout>
      <ComingSoon pageTitle="Compliance" />
    </DashboardLayout>
  );
}
