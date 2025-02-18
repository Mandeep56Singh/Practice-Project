import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "repo-uikit/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "repo-uikit/components/ui/card";
import { Input } from "repo-uikit/components/ui/input";
import { Label } from "repo-uikit/components/ui/label";
import useLogin from "../../hooks/useLogin";
import { loginSchema, LoginType } from "../../schema/auth.schema";
export function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { loginMutate, loginPending } = useLogin();

  const handleLogin = (data: LoginType) => {
    loginMutate(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="m@example.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm col-span-4 -mt-4">
                  {errors.email.message}
                </p>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className=" flex items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    id="password"
                    {...register("password")}
                  />
                  <Button
                    variant={"ghost"}
                    className="-ml-10"
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? <EyeOff></EyeOff> : <Eye></Eye>}
                  </Button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm col-span-4 -mt-4">
                  {errors.password.message}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loginPending}>
                {loginPending ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <span className="text-primary hover:underline">
                <Link to="/signup"> Sign up</Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
