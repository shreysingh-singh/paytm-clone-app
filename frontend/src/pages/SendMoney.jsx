import React, { useState } from "react";
import { Button } from "../components/Button";
import { useSearchParams } from "react-router";
import axios from "axios";


export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const availableBalance = 12500;

  const formatter = new Intl.NumberFormat("en-IN");

  

  function handleQuick(val) {
    setAmount(String(val));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num <= 0) {
      setError("Enter a valid amount");
      return;
    }
    if (num > availableBalance) {
      setError("Insufficient balance");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/account/transfer`,
        { to: id, amount: num, note },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setSuccess(true);
      setAmount("");
      setNote("");
    } catch (err) {
      setError(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold">Send Money</h2>
          <p className="text-sm text-slate-500 mt-1">
            Quick and secure transfers
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Recipient */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-600">
              Recipient
            </label>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,#06b6d4 0%,#7c3aed 100%)",
                  }}
                >
                  {name[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-slate-900">
                    {name}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Amount + Quick buttons */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-slate-700"
                >
                  Amount
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    id="amount"
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-slate-200 p-3 text-lg font-semibold"
                  />
                  <div className="hidden sm:flex flex-col text-sm text-slate-500">
                    <div>Preview</div>
                    <div className="font-medium text-slate-900">
                      {amount ? `₹ ${formatter.format(Number(amount))}` : "—"}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  {[100, 500, 1000, 2000].map((q) => (
                    <button
                      type="button"
                      key={q}
                      onClick={() => handleQuick(q)}
                      className="px-3 py-1 rounded-md bg-slate-100 text-sm text-slate-700 hover:bg-slate-200"
                    >{`₹ ${formatter.format(q)}`}</button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-slate-700"
                >
                  Note (optional)
                </label>
                <input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="For dinner, rent, etc."
                  className="mt-2 w-full rounded-md border border-slate-200 p-2"
                />
              </div>

              {error ? (
                <div className="text-sm text-red-600">{error}</div>
              ) : null}

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth={false}
                  loading={loading}
                >
                  Initiate Transfer
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setAmount("");
                    setNote("");
                    setError("");
                  }}
                >
                  Reset
                </Button>
              </div>

              {success && (
                <div className="mt-2 p-3 rounded-md bg-green-50 text-green-800">
                  Transfer completed successfully to{" "}
                  <span className="font-semibold">{name}</span>.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
