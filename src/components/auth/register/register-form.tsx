"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye, EyeOff } from "lucide-react";

import { register as registerApi } from "@/lib/api";
import { setAuthTokens } from "@/lib/auth";
import { useAuth } from "@/context/auth-context";

const BLUE = "#0946B1";
const BLUE_HOVER = "#07328B";

/* Password rules */
const passwordRules = {
  length: (pw: string) => pw.length >= 8,
  uppercase: (pw: string) => /[A-Z]/.test(pw),
  lowercase: (pw: string) => /[a-z]/.test(pw),
  number: (pw: string) => /\d/.test(pw),
  special: (pw: string) => /[\W_]/.test(pw),
};

export default function RegisterForm() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const [mounted, setMounted] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isValidPassword = (pw: string) =>
    Object.values(passwordRules).every((rule) => rule(pw));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!termsChecked)
      return setMessage("You must accept the terms & conditions.");
    if (email !== confirmEmail) return setMessage("Emails do not match.");
    if (password !== confirmPassword)
      return setMessage("Passwords do not match.");
    if (!isValidPassword(password))
      return setMessage("Password does not meet requirements.");

    try {
      const data = await registerApi(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        phone.trim(),
        address.trim(),
        city.trim(),
        country.trim(),
        password,
      );

      setAuthTokens(data.accessToken, data.refreshToken);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err: any) {
      setMessage(err.message || "Registration error");
    }
  };

  return (
    <Card className="w-full border border-gray-200 shadow-none rounded-xl">
      <CardContent className="space-y-8 p-8 text-muted-foreground">
        <form className="space-y-8" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "First Name", value: firstName, setValue: setFirstName },
              { label: "Last Name", value: lastName, setValue: setLastName },
              { label: "E-Mail", value: email, setValue: setEmail },
              {
                label: "Confirm E-Mail",
                value: confirmEmail,
                setValue: setConfirmEmail,
              },
              { label: "Address", value: address, setValue: setAddress },
              { label: "City", value: city, setValue: setCity },
            ].map(({ label, value, setValue }) => (
              <div key={label} className="space-y-2">
                <Label className="text-sm">{label}</Label>
                <Input
                  className="h-12 text-base"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
            ))}

            {/* Phone with country code hint */}
            <div className="space-y-2">
              <Label className="text-sm">Phone Number</Label>
              <Input
                className="h-12 text-base"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+2348012345678"
                required
              />
              <p className="text-xs text-muted-foreground">
                Include your country code (e.g. <strong>+234</strong>)
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full h-12 text-base flex items-center px-3">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Label className="text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="h-12 pr-12 w-full text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-muted-foreground hover:text-gray-700"
                  onClick={() => setShowPassword((p) => !p)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <ul className="mt-2 space-y-1 text-xs">
                {[
                  ["At least 8 characters", passwordRules.length(password)],
                  ["One uppercase letter", passwordRules.uppercase(password)],
                  ["One lowercase letter", passwordRules.lowercase(password)],
                  ["One number", passwordRules.number(password)],
                  ["One special character", passwordRules.special(password)],
                ].map(([text, valid]) => (
                  <li
                    key={text as string}
                    className={
                      valid ? "text-green-600" : "text-muted-foreground"
                    }>
                    • {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 relative">
              <Label className="text-sm">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="h-12 pr-12 w-full text-base"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-muted-foreground hover:text-gray-700"
                  onClick={() => setShowConfirmPassword((p) => !p)}>
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              checked={termsChecked}
              onCheckedChange={(checked) => setTermsChecked(Boolean(checked))}
              className="data-[state=checked]:bg-[#0946B1] data-[state=checked]:border-[#0946B1]"
            />
            <Label className="text-sm font-normal">
              I agree to the{" "}
              <Link href="#" className="text-[#0946B1] underline">
                Terms & Conditions
              </Link>
            </Label>
          </div>

          <Button
            type="submit"
            className="rounded-full px-10 text-white"
            style={{ backgroundColor: BLUE }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = BLUE_HOVER)
            }
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = BLUE)}>
            Register
          </Button>

          {message && <p className="text-center text-red-500">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
