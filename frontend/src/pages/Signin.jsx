import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;

    setLoading(true);
    // simulate signin
    setTimeout(() => {
      setLoading(false);
      console.log("Signed in", { email });
      // proceed to dashboard in a real app
      setEmail("");
      setPassword("");
    }, 900);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <Heading
          label="Sign in to your account"
          subtitle="Welcome back"
          as="h2"
          size="lg"
        />

        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6">
            <Inputbox
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              error={errors.email}
              required
            />

            <Inputbox
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              type="password"
              error={errors.password}
              required
            />

            <div className="mt-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                Sign in
              </Button>
            </div>

            <div className="mt-3 text-right px-1 text-sm">
              <a href="#" className="text-sky-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </form>

        <div className="mt-4 px-6 text-sm text-slate-600">
          By signing in you agree to our terms and privacy policy.
        </div>
      </div>

      <BottomWarning
        message="Don't have an account?"
        linkText="Sign up"
        linkHref="/signup"
        onLinkClick={() => (window.location.href = "/signup")}
        visible={showWarning}
        onClose={() => setShowWarning(false)}
        variant="info"
      />
    </div>
  );
}
