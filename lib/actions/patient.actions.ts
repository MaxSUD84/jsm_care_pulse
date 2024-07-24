'use server';

import { ID, Query } from 'node-appwrite';
import { databases, env, storage, users } from '@/lib/appwrite.config';
import { parseStringify } from '@/lib/utils';
import { InputFile } from 'node-appwrite/file';

export const createuser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string,
      );

      file = await storage.createFile(env.BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      env.DATABASE_ID!,
      env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${env.ENDPOINT}/storage/buckets/${env.BUCKET_ID}/files/${file?.$id}/view?project=${env.PROJECT_ID}`,
        ...patient,
      },
    );

    // console.log('newPatient: ', newPatient);

    return parseStringify(newPatient);
  } catch (error) {
    console.error(error);
  }
};
