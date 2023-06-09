import { useState } from 'react'

import { Input } from '@chakra-ui/react'

import { type GlobalFilterProps } from '@/views/admin/default/variables/columnsData'
import debounce from 'just-debounce-it'

export const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
  placeholder = 'Buscar por nombre'
}: GlobalFilterProps): JSX.Element => {
  const TWO_HUNDRED_MS = 300
  const [value, setValue] = useState(globalFilter)

  const onChange = debounce((value: string) => {
    setGlobalFilter(value ?? undefined)
  }, TWO_HUNDRED_MS)

  return (
    <Input
      type="text"
      size="sm"
      minWidth='11rem'
      w={{ xs: '100%', sm: 'auto' }}
      py={5}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={({ target }) => {
        setValue(target.value)
        onChange(target.value)
      }}
    />
  )
}
