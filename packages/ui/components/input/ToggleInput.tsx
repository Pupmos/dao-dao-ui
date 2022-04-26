import { ChangeEventHandler } from 'react'
import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

/**
 * @param label      - the label for the value that this will contain.
 * @param register   - the register function returned by `useForm`.
 * @param error      - any errors that have occured during validation of this
 *                     input.
 * @param validation - a list of functions that, when given the current value
 *                     of this field, return true if the value is valid and an
 *                     error message otherwise.
 */
export function ToggleInput<FieldValues, FieldName extends Path<FieldValues>>({
  label,
  register,
  validation,
  onChange,
  disabled = false,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )
  return (
    <div className="form-check form-switch">
      <input
        defaultChecked={true}
        disabled={disabled}
        role="switch"
        type="checkbox"
        {...register(label, { validate, onChange })}
      />
    </div>
  )
}
