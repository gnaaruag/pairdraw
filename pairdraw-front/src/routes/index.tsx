import { createBrowserRouter } from "react-router-dom";
import Onboard from "../pages/onboard";
import Canvas from "../pages/canvas";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import NewPair from "../pages/NewPair";
import Pairlist from "../pages/Pairlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Onboard />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/canvas",
    element: (
		<ProtectedRoute>
			<Canvas />
		</ProtectedRoute>
	),
  },
  {
    path: "/pair-canvas",
    element: (
		<ProtectedRoute>
			<Canvas />
		</ProtectedRoute>
	),
  },
  {
    path: "/new-pair",
    element: (
		<ProtectedRoute>
			<NewPair />
		</ProtectedRoute>
	),
  },
  {
    path: "/pairlist",
    element: (
		<ProtectedRoute>
			<Pairlist />
		</ProtectedRoute>
	),
  },
]);
export default router;
