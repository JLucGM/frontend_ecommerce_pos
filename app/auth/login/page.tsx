import { LoginForm } from "@/components/auth/login-form";

export default function login() {
  return (
    <>
      <div className="flex items-center mt-10 md:mt-0 justify-center min-h-screen">
        <LoginForm className="w-full max-w-sm mx-auto" />
      </div>
    </>
  );
}
