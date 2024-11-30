import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCoreApiCreateUser } from "@/gen";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
  let navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signUp = useCoreApiCreateUser({
    mutation: {
      onSuccess() {
        navigate("/login/");
      },
    },
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your username and password below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {signUp.error && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {
                // @ts-ignore
                signUp.error.status === 400 && signUp.error.response.data.detail
              }
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={signUp.isPending}
            onClick={() => signUp.mutate({ data: { username, password } })}
          >
            {signUp.isPending ? "Loading..." : "Sign Up"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login/" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
