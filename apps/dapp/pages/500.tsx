import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import 'i18n'

const Custom500: NextPage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()

  return (
    <div className="max-w-prose break-words p-6">
      <h1 className="text-3xl font-bold">500 - {t('errors.500.title')}</h1>
      <p className="mt-3">
        {t('errors.500.body')}{' '}
        <code>{router.asPath}</code>. Consider returning{' '}
        <Link href="/">
          <a className="link">home</a>
        </Link>
      </p>
    </div>
  )
}

export default Custom500
