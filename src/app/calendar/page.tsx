"use client";

import React from 'react';
import ComingSoon from '@/components/shared/ComingSoon';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <ComingSoon pageTitle="Calendar" />
    </DashboardLayout>
  );
}
