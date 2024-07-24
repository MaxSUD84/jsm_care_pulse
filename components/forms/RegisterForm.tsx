'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField, { FormFieldTypes } from '@/components/CustomFormField';
import SubmitButton from '@/components/SubmitButton';
import { useState } from 'react';
import { PatientFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SelectItem } from '@/components/ui/select';
import FileUploader from '@/components/FileUploader';
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constant';
import Image from 'next/image';
import { registerPatient } from '@/lib/actions/patient.actions';
import React from 'react';

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  // const { watch } = form;
  // const watchAllFields = watch();

  // React.useEffect(() => {
  //   const subscription = watch((value, { name, type }) => console.log(value, name, type));
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;
    if (values.identificationDocument && values.identificationDocument?.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument ? formData : undefined,
        privacyConsent: values.privacyConsent,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
      };

      // @ts-ignore
      const newPatient = await registerPatient(patientData);

      if (newPatient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Регистрация.</h1>
          <p className="text-dark-700">Предоставте информацию о себе, заполните следующую форму.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Персональные данные</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="name"
            label="ФИО"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="email"
              label="Эл.почта"
              placeholder="johndoe@example.ru"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldTypes.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Телефон"
              placeholder="+7 (495) 123-45-67"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Дата рождения"
            />

            <CustomFormField
              fieldType={FormFieldTypes.SKELETON}
              control={form.control}
              name="gender"
              label="Пол"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex h-11 gap-6 xl:justify-between"
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="address"
              label="Адрес"
              placeholder="2-ая Магистральная ул. 15 кв.45, г. Саратов"
            />

            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="occupation"
              label="Профессия"
              placeholder="Учитель истории"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Имя доверенного человека"
              placeholder="Доверенное лицо"
            />

            <CustomFormField
              fieldType={FormFieldTypes.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Телефон доверенного человека"
              placeholder="+7 (495) 321-76-54"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Медицинские данные</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldTypes.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Лечащий врач"
            placeholder="Выберите врача"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Страховая компания"
              placeholder="АльфаСтрахование"
            />

            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="№ страхового полиса"
              placeholder="ABC-1234-567890"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Аллегрическая реакция"
              placeholder="Орехи, пыль домашняя и т.д."
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Принимаемые припараты"
              placeholder="Ибупрофен 200мг, Парацетамол 500мг"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Наследственные заболевания"
              placeholder="Мигрень, сердечная недостаточность"
            />
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Перенесенные операции"
              placeholder="Удаление гланд, апендицит"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Идентификация и Подтверждение</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldTypes.SELECT}
            control={form.control}
            name="identificationType"
            label="Удостоверение личности"
            placeholder="Выберите документ из списка"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Серия и номер документа"
            placeholder="12 34 567890"
          />

          <CustomFormField
            fieldType={FormFieldTypes.SKELETON}
            control={form.control}
            name="idetificationDocument"
            label="Скан документа удостоверяющего личность"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Согласие на предоставление данных</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldTypes.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="Я даю согласие лечение"
          />
          <CustomFormField
            fieldType={FormFieldTypes.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Я даю согласие на раскрытие и использование информации о моём здоровьи"
          />
          <CustomFormField
            fieldType={FormFieldTypes.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Я соглашаюсь с предложенной политикой конфиденциальности"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Подтвердить и продолжить</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
