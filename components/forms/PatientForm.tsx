"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components//ui/form"
import CustomFormField from "@/components/CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

export enum FormFieldTypes {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "Jonh Doe",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
        // const userData = { name, email, phone };
        // const user = await createUser(userData);
        // if(user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Добро пожаловать, 👋</h1>
            <p className="text-dark-700">Запланируем ваше первое посещение.</p>
        </section>
        
        <CustomFormField
                fieldType={FormFieldTypes.INPUT} 
                control={form.control} 
                name="name"
                label="ФИО"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
        />

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

        <SubmitButton 
            isLoading={isLoading}
        >Войти</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm