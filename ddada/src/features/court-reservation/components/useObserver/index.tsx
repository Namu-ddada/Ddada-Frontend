import { useEffect } from 'react'

interface ObserverProps {
  target: React.RefObject<HTMLElement>
  root?: Element | null
  rootMargin?: string
  threshold?: number
  onIntersect: IntersectionObserverCallback
}

export const useObserver = ({
  target,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
  onIntersect,
}: ObserverProps) => {
  useEffect(() => {
    let observer: IntersectionObserver
    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      })
      observer.observe(target.current)
    }
    return () => observer && observer.disconnect()
  }, [target, root, rootMargin, threshold, onIntersect])
}
