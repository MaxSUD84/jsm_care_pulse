'use server';

import { ID, Query } from 'node-appwrite';
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from '@/lib/appwrite.config';
import { formatDateTime, parseStringify } from '@/lib/utils';
import { Appointment } from '@/types/appwire.types';
import { revalidatePath } from 'next/cache';

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    console.log(APPOINTMENT_COLLECTION_ID, DATABASE_ID);

    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment,
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const getAppointment = async (appoinmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appoinmentId,
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error(error);
  }
};

export const getRecentAppontmentList = async () => {
  try {
    const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [
      Query.orderDesc('$createdAt'),
    ]);

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce((acc, app) => {
      switch (app.status) {
        case 'cancelled':
          acc.cancelledCount += 1;
          break;
        case 'pending':
          acc.pendingCount += 1;
          break;
        case 'scheduled':
          acc.scheduledCount += 1;
          break;
        default:
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(error);
  }
};

export const updateAppointment = async ({
  appointment,
  appointmentId,
  userId,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment,
    );

    if (!updateAppointment) {
      throw new Error('Appointment not found');
    }

    // TODO: SMS notification
    const smsMessage = `
      Сообщение от CarePulse.
      ${
        type === 'schedule'
          ? `Ваш визит к врачу Док. ${appointment.primaryPhysician} запланирован на ${formatDateTime(appointment.schedule!).dateTime}`
          : `Информируем Вас, что ваш визит к врачу был отменен. Причина: ${appointment.cancellationReason}`
      }
    `;

    // await sendSMSNotification(userId, smsMessage); // Необходима настройка Messaging в Apppwrite (в примере используется Twilio)

    revalidatePath('/admin');
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(ID.unique(), content, [], [userId]);

    return parseStringify(message);
  } catch (error) {
    console.error(error);
  }
};
