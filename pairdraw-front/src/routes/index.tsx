import { createBrowserRouter } from "react-router-dom";
import Onboard from "../pages/onboard";
import Canvas from "../pages/canvas";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Onboard />,
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
]);
export default router;
