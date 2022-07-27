import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  Trans,
} from '@dao-dao/ui'
import {
  validateContractAddress,
  validateJSON,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'
import { IsAdminWarning } from './IsAdminWarning'

export interface MigrateOptions {
  onContractChange: (s: string) => void
  contractAdmin: string | undefined
}

export const MigrateContractComponent: ActionComponent<MigrateOptions> = ({
  getFieldName,
  onRemove,
  errors,
  readOnly,
  coreAddress,
  options: { onContractChange, contractAdmin },
  Loader,
}) => {
  const { register, control } = useFormContext()
  const { t } = useTranslation()

  return (
    <ActionCard
      Icon={MigrateContractIcon}
      onRemove={onRemove}
      title={t('title.migrateSmartContract')}
    >
      <p className="mb-4 max-w-prose secondary-text">
        <Trans key={'form.migrateDescription'} Loader={Loader}>
          This will{' '}
          <a
            className="underline"
            href="https://docs.cosmwasm.com/docs/1.0/smart-contracts/migration/"
            rel="noreferrer"
            target="_blank"
          >
            migrate
          </a>{' '}
          the selected contract to a new code ID.
        </Trans>
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-col grow gap-1">
          <InputLabel name={t('form.smartContractAddress')} />
          <AddressInput
            disabled={readOnly}
            error={errors?.contract_addr}
            fieldName={getFieldName('contract')}
            onChange={(v) => onContractChange(v.target.value)}
            register={register}
            validation={[validateRequired, validateContractAddress]}
          />
          <InputErrorMessage error={errors?.contract} />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.codeID')} />
          <NumberInput
            disabled={readOnly}
            error={errors?.code_id}
            fieldName={getFieldName('codeId')}
            register={register}
            validation={[validateRequired, validatePositive]}
          />
          <InputErrorMessage error={errors?.codeId} />
        </div>
      </div>
      <div className="my-2">
        <IsAdminWarning admin={contractAdmin} maybeAdmin={coreAddress} />
      </div>
      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.migrateMessage')} />
        <CodeMirrorInput
          control={control}
          error={errors?.msg}
          fieldName={getFieldName('msg')}
          readOnly={readOnly}
          validation={[validateJSON]}
        />
        <InputErrorMessage error={errors?.msg} />
      </div>
    </ActionCard>
  )
}

export const MigrateContractIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.whale')} symbol="🐋" />
}
