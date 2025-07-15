import React, { ReactNode } from 'react';

function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<main className='w-full min-h-screen flex flex-col items-center justify-center bg-gray-100'>
			{children}
		</main>
	);
}

export default AuthLayout;
