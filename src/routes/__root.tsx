import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />

    </>
  ),
})
