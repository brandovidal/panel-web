// libs
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

// interfaces
import type { AlertProps } from '@/interfaces/common/Alert'

// Layout
import AdminLayout from '@/layouts/admin'

// Views
import StudentAddView from '@/views/admin/student/components/StudentAdd'

// form
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// schema
import { registerStudentSchema, type RegisterStudentInput } from '@/schemas/student'

// hooks
import { useNotification } from '@/hooks/useNotification'

// services
import { useCreateStudent } from '@/services/student'

// styles
import { Box } from '@chakra-ui/react'

export default function StudentAdd (): JSX.Element {
  const router = useRouter()
  const { showToast, showErrorToast } = useNotification()

  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting }
  } = useForm<RegisterStudentInput>({
    resolver: zodResolver(registerStudentSchema)
  })

  const [alert, setAlert] = useState<AlertProps>()

  const onSuccess = (): void => {
    showToast({ title: 'Usuario creado correctamente', description: 'El usuario se ha creado correctamente' })
    void router.push('/admin/student/list')
  }

  const onError = (): void => {
    setAlert({ message: 'El usuario o correo ya existe', status: 'warning' })
    showErrorToast({ title: 'El usuario o correo ya existe', description: 'Por favor, ingresar otro usuario o correo' })
  }

  const { mutate: addStudent } = useCreateStudent({ onSuccess, onError })

  const useOnSubmit: SubmitHandler<RegisterStudentInput> = useCallback(data => {
    console.log(data)
    addStudent(data)
  }, [addStudent])

  const onCancel = useCallback(() => { router.back() }, [router])

  return (
    <AdminLayout navbarText='Agregar Usuario'>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <StudentAddView control={control} alert={alert} disabled={isLoading || isSubmitting} onSubmit={handleSubmit(useOnSubmit)} onCancel={onCancel} />
      </Box>
    </AdminLayout>
  )
}
