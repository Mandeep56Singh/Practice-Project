import { LoginForm } from "../components/forms/LoginForm";
import Logo from "../components/ui/Logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo></Logo>
        <LoginForm />
      </div>
    </div>
  );
}
