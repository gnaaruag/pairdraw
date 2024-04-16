import { Navigate, createBrowserRouter } from "react-router-dom";
import Onboard from "../pages/onboard";
import Canvas from "../pages/FreeDrawCanvas";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import NewPair from "../pages/NewPair";
import Pairlist from "../pages/Pairlist";
import JoinPair from "../pages/JoinPair";
import PairHome from "../pages/PairHome";
// import CanvasComponent from "../components/CanvasComponent";
import FreeDrawCanvas from "../pages/FreeDrawCanvas";

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
  {
    path: "/join-pair",
    element: (
		<ProtectedRoute>
			<JoinPair />
		</ProtectedRoute>
	),
  },
  {
    path: "/pair/:id",
    element: (
		<ProtectedRoute>
			<PairHome />
		</ProtectedRoute>
	),
  },
  {
    path: "/freedraw",
    element: (
		<ProtectedRoute>
			<FreeDrawCanvas />
		</ProtectedRoute>
	),
  },
  {
    path: "/sso-callback?redirect_url=https%3A%2F%2Fpairdraw.vercel.app%2Fhome",
    element: (
      <Navigate to="/" replace />
	),
  },
]);
export default router;
