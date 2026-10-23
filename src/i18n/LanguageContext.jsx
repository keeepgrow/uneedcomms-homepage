import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'

const STORAGE_KEY = 'uneed-lang'
const LanguageContext = createContext({ lang: 'ko', setLang: () => {}, t: (ko) => ko })

// 최초 방문 시 언어 결정 순서
//  1) 사용자가 직접 선택한 값(localStorage)이 있으면 그대로 존중
//  2) 없으면 브라우저 언어(navigator.languages) 중 ko/en 선호 순서로 판별
//     → 영어권(브라우저 언어가 영어) 방문자는 자동으로 en, 그 외는 ko
function detectInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ko' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  try {
    const prefs =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || '']
    for (const code of prefs) {
      const c = code.toLowerCase()
      if (c.startsWith('ko')) return 'ko'
      if (c.startsWith('en')) return 'en'
    }
  } catch {
    /* ignore */
  }
  return 'ko'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

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
