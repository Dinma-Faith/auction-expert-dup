"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

import { login } from "@/lib/api";
import { setAuthTokens } from "@/lib/auth";
import { useAuth } from "@/context/auth-context";
import { useUI } from "@/context/ui-context";

const BLUE = "#0946B1";
const BLUE_HOVER = "#063A91";

export default function LoginForm() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const { closeLogin, openForgotPassword } = useUI();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      setAuthTokens(data.accessToken, data.refreshToken);

      if (rememberMe) localStorage.setItem("rememberMe", "true");

      setIsAuthenticated(true);
      closeLogin();
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Login to your account
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 text-base"
              required
            />
          </div>

          <div className="space-y-1.5 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 pr-12 text-base"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-muted-foreground hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(v) => setRememberMe(Boolean(v))}
                className="data-[state=checked]:bg-[#0946B1] data-[state=checked]:border-[#0946B1]"
              />
              <Label className="text-sm">Remember me</Label>
            </div>

            <button
              type="button"
              onClick={() => {
                closeLogin();
                openForgotPassword();
              }}
              className="text-sm text-[#0946B1] underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-white"
            style={{ backgroundColor: BLUE }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = BLUE_HOVER)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = BLUE)
            }
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {error && (
            <p className="text-center text-red-500 text-sm">{error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
