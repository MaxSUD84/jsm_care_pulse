'use server';

import { ID, Query } from 'node-appwrite';
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from '@/lib/appwrite.config';
import { parseStringify } from '@/lib/utils';
import { Appointment } from '@/types/appwire.types';

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
