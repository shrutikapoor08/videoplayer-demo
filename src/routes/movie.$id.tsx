import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MovieDetail from '@/components/MovieDetail'
// const LazyMovieDetail = lazy(() => import('@/components/MovieDetail'))

// const MovieDetailWrapper = (props: any) => (
//   // <Suspense fallback={<div>Loading movie…</div>}>
//     // <LazyMovieDetail {...props} />
//   // </Suspense>
// )

export const Route = createFileRoute('/movie/$id')({
  component: MovieDetail,
})

