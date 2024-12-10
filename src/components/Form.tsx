import { zodResolver } from "@hookform/resolvers/zod"
import { ComponentProps } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { TypeOf, ZodSchema } from "zod"

type Props<T extends ZodSchema> = Omit<ComponentProps<"form">, "onSubmit"> & {
  schema: T
  onSubmit: SubmitHandler<TypeOf<T>>
}

export const Form = <T extends ZodSchema>({
  schema,
  onSubmit,
  children,
  ...otherProps
}: Props<T>) => {
  const formMethods = useForm<TypeOf<T>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} {...otherProps}>
        {children}
      </form>
    </FormProvider>
  )
}
