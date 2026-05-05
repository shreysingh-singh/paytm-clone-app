import React, { useState } from 'react';

export function Balance({ value = 0, currency = '₹', loading = false, growth = null, onAddMoney }) {
  const [masked, setMasked] = useState(false);

  const formatter = new Intl.NumberFormat('en-IN');
  const formatted = `${currency} ${formatter.format(value)}`;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between w-full max-w-sm">
      <div>
        <div className="text-sm text-slate-500">Your balance</div>
        {loading ? (
          <div className="mt-2 h-8 w-36 bg-slate-100 rounded animate-pulse" />
        ) : (
          <div className="mt-2 flex items-center gap-3">
            <div className="text-2xl font-semibold text-slate-900 tracking-tight">
              {masked ? '••• •••' : formatted}
            </div>

            {growth !== null ? (
              <div className={`text-sm font-medium px-2 py-0.5 rounded-full ${growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {growth >= 0 ? `+${growth}%` : `${growth}%`}
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMasked((m) => !m)}
            className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-md hover:bg-slate-100"
          >
            {masked ? 'Show' : 'Hide'}
          </button>

          <button
            type="button"
            onClick={onAddMoney}
            className="text-xs text-white bg-sky-600 hover:bg-sky-700 px-3 py-1 rounded-md shadow-sm"
          >
            Add money
          </button>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-center justify-center text-slate-400">
        <svg className="h-9 w-9 text-sky-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 6h10v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          <path d="M7 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}