import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export  function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!firstName.trim()) e.firstName = "First name is required";
    if (!lastName.trim()) e.lastName = "Last name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;

    setLoading(true);
    // simulate request
    setTimeout(() => {
      setLoading(false);
      // Normally you'd call your API here
      console.log("Registered", { firstName, lastName, email });
      // Clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <Heading
          label="Create your account"
          subtitle="Sign up to continue"
          as="h2"
          size="lg"
        />

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-4 px-6">
            <div>
              <Inputbox
                label="First name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                error={errors.firstName}
                required
              />
            </div>
            <div>
              <Inputbox
                label="Last name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                error={errors.lastName}
                required
              />
            </div>
          </div>

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
              placeholder="Enter a secure password"
              type="password"
              error={errors.password}
              required
            />

            <div className="mt-4">
              <Button
              onClick={() => {
                axios.post("http://localhost:3000/api/v1/user/signup", {
                  firstName,
                  lastName,
                  email,
                  password
                }).then(navigate("/signin"));
              }}
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                Sign up
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-4 px-6 text-sm text-slate-600">
          By creating an account you agree to our terms and privacy policy.
        </div>
      </div>

      <BottomWarning
        message="Already have an account?"
        linkText="Sign in"
        linkHref="/signin"
        onLinkClick={() => {
          // In a real app you might navigate programmatically
          window.location.href = "/signin";
        }}
        visible={showWarning}
        onClose={() => setShowWarning(false)}
        variant="info"
      />
    </div>
  );
}
