import MovieDetail from '@/components/MovieDetail'
// import { lazy } from 'react'
// const MovieDetail = lazy(() => import('@/components/MovieDetail'))
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/movie/$id')({
  component: MovieDetail,
})

