import { RegisterForm } from "@/components/auth/register-form";

export default function register() {
  return (
    <>
      <div className="flex items-center mt-10 md:mt-0 justify-center min-h-screen">
        <RegisterForm className="w-full max-w-sm mx-auto" />
      </div>
    </>
  );
}
