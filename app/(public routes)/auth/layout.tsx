import { GoogleOAuthProvider } from '@react-oauth/google';

interface AuthRoutesLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthRoutesLayoutProps) {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
        {children}
      </GoogleOAuthProvider>
    </>
  );
}
