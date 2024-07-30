'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { Appointment } from '@/types/appwire.types';

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: {
  type: 'schedule' | 'cancel';
  patientId: string;
  userId: string;
  appointment?: Appointment;
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  const typeText =
    type === 'schedule'
      ? 'запланировать'
      : type === 'cancel'
        ? 'отменить'
        : "'!тип действия не определен!'";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className={`capitalize ${type === 'schedule' && 'text-green-500'}`}
        >
          {typeText}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="md-4 space-y-3">
          <DialogTitle className="capitalize">{typeText} запись</DialogTitle>
          <DialogDescription>Заполните следующие поля чтобы {typeText} запись</DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          type={type}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
