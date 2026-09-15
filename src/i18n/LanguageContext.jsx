import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'

const STORAGE_KEY = 'uneed-lang'
const LanguageContext = createContext({ lang: 'ko', setLang: () => {}, t: (ko) => ko })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'ko'
    } catch {
      return 'ko'
    }
  })

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // 번역이 없으면 한글 원문을 그대로 반환(폴백) — 영어 텍스트는 translations.js 에 채워짐
  const t = useCallback(
    (ko) => (lang === 'en' && translations[ko] != null ? translations[ko] : ko),
    [lang]
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}
