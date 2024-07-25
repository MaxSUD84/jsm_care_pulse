import { Button } from '@/components/ui/button';
import { Doctors } from '@/constant';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  return (
    <div className="flex h-screen max-h-screen ps-[5%]">
      <div className="success-img">
        <Link href={'/'}>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success"
            height={300}
            width={280}
            className=""
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            <span className="text-green-500">Ваша запись</span> была успешно создана!
          </h2>
          <p>Мы потвердим запись в бизжайшее время.</p>
        </section>

        <section className="request-details">
          <p>Вы записались к:</p>
          <div className="flex items-center gap-3">
            <Image src={doctor?.image!} alt="doctor" height={100} width={100} className="size-6" />
            <p className="whitespace-nowrap">док. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image src="/assets/icons/calendar.svg" width={24} height={24} alt="calendar" />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant={'outline'} className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>Новая запись</Link>
        </Button>
        <p className="copyright">© 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default Success;