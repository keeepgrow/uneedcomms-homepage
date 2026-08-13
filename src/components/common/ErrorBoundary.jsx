import { Component } from 'react'

/**
 * 배경 WebGL 효과(파티클/유체 커서 등)가 컨텍스트 실패로 throw해도
 * 앱 전체가 언마운트되지 않도록 격리한다. 실패 시 fallback(기본 null)만 렌더.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    // 배경 효과 실패는 치명적이지 않으므로 조용히 무시 (개발 중엔 콘솔에 남김)
    if (import.meta.env.DEV) console.warn('[ErrorBoundary] 배경 효과 실패:', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}
