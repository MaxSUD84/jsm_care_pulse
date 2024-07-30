import StatCard from '@/components/StatCard';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/DataTable';
import { getRecentAppontmentList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';

const Admin = async () => {
  const appointments = await getRecentAppontmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href={'/'} className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Панель Администратора</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Привет 👋</h1>
          <p className="text-dark-700">Приступим к управлению &quot;Приемами&quot;</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Плановые приемы"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Предстоящие приемы"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="appointments"
            count={appointments.cancelledCount}
            label="Отмененные приемы"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
