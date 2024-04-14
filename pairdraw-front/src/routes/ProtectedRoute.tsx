import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
	return (
		<>
			<SignedIn >
				<>{children}</>
			</SignedIn>
			<SignedOut>
				<div className="flex flex-col justify-center items-center">
					<p>You Do not have access to this page</p>
					<a href="/">Go back to landing</a>
				</div>
			</SignedOut></>
	)
}