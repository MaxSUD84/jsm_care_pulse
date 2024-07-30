'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import StatusBadge from '@/components/StatusBadge';
import AppointmentModal from '@/components/AppointmentModal';

import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constant';
import { Appointment } from '@/types/appwire.types';

export const columns: ColumnDef<Appointment>[] = [
  {
    header: '№',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    header: 'Пациент',
    accessorKey: 'patient',
    cell: ({ row }) => <p>{row.original.patient.name}</p>,
  },
  {
    accessorKey: 'status',
    header: () => <p className="flex item-center justify-center">Статус</p>,
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Время приема',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[115px}">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: () => <p className="flex item-center justify-center">Врач</p>,
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician);

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image || ''}
            alt={doctor?.name || ''}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Док. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4 flex item-center justify-center">Действия</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Запланировать посещение"
            description="Чтобы потвердить посещение заполните несколько деталей о визите"
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Отменить посещение"
            description="Вы точно хотите отменить это посещение?"
          />
        </div>
      );
    },
  },
];

// <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button variant="ghost" className="h-8 w-8 p-0">
//       <span className="sr-only">Open menu</span>
//       <MoreHorizontal className="h-4 w-4" />
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent align="end">
//     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//     <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
//       Copy payment ID
//     </DropdownMenuItem>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem>View customer</DropdownMenuItem>
//     <DropdownMenuItem>View payment details</DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
