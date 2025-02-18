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
import useSignUp from "../../hooks/useSignUp";
import { signUpSchema, SignUpType } from "../../schema/auth.schema";
export function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { signUpMutate, signUpPending } = useSignUp();
  const handleSignup = (data: SignUpType) => {
    signUpMutate(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account by filling in the details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="flex flex-col gap-6">
              {/* Username Field */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  placeholder="Your username"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs sm:text-sm -mt-4">
                  {errors.username.message}
                </p>
              )}

              {/* Email Field */}
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
                <p className="text-red-500 text-xs sm:text-sm -mt-4">
                  {errors.email.message}
                </p>
              )}

              {/* Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="flex items-center">
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
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm -mt-4">
                  {errors.password.message}
                </p>
              )}

              {/* Confirm Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <div className="flex items-center">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    id="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <Button
                    variant={"ghost"}
                    className="-ml-10"
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm -mt-4">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/* Signup Button */}
              <Button type="submit" className="w-full" disabled={signUpPending} >
                { signUpPending ? "Creating account..." : "Sign UP"}
              </Button>
            </div>

            {/* Already have an account? */}
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <span className="text-primary hover:underline">
                <Link to="/login"> Login</Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
