'use client'

import 'react-phone-number-input/style.css'
import { E164Number } from "libphonenumber-js/core";

import { Control } from 'react-hook-form'
import Image from 'next/image'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { FormFieldTypes } from '@/components/forms/PatientForm'
import PhoneInput from 'react-phone-number-input'

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldTypes, 
    name: string, 
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props}: {field: any, props: CustomProps}) => {
    const { 
        fieldType, 
        name,
        label,
        placeholder,
        iconSrc,
        iconAlt,
        disabled,
        dateFormat,
        showTimeSelect,
        children,
        renderSkeleton } = props;    

    switch(fieldType){
        case FormFieldTypes.INPUT:
            return (
                <div className="flex border rounded-md border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image 
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={24}
                            width={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
                );
        case FormFieldTypes.TEXTAREA:
        case FormFieldTypes.SELECT:
        case FormFieldTypes.CHECKBOX:
        case FormFieldTypes.DATE_PICKER:
        case FormFieldTypes.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='RU' 
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined} // E164Number | undefined
                        onChange={field.onChange}
                        className='input-phone shad-input border-0'
                    />
                </FormControl>
            );
        case FormFieldTypes.SKELETON:
        default:
            break;
    }
}

// const RenderField = () => {

// }

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
        control={ control }
        name={name}
        render={({ field }) => (
        <FormItem className='flex-1'>
            {fieldType !== FormFieldTypes.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
            )}

            <RenderField field={field} props={props} />
            <FormMessage className='shad-error'/>
        </FormItem>
        )}
    />
  )
}

export default CustomFormField