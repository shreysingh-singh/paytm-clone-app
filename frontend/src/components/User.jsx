import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function formatCurrency(v) {
  return `₹ ${new Intl.NumberFormat("en-IN").format(v)}`;
}

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Futher i will add debounce
  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        // not authenticated -> go to signin
        navigate("/signin");
        return;
      }

      try {
        const params = {};
        if (filter && filter.trim()) params.filter = filter.trim();

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/bulk`,
          {
            params,
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (mounted) setUsers(response.data.user || []);
      } catch (err) {
        // Log full error for debugging
        console.error("Users fetch error:", err);

        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          // Handle auth errors explicitly
          if (status === 401 || status === 403) {
            setError("Authorization required. Redirecting to sign in...");
            localStorage.removeItem("token");
            navigate("/signin");
            return;
          }

          const respData = err.response?.data;
          const message =
            respData?.message ||
            respData?.msg ||
            (typeof respData === "object"
              ? JSON.stringify(respData)
              : respData) ||
            err.message ||
            "Failed to load users";

          setError(`[${status || "??"}] ${message}`);
        } else {
          setError("Failed to load users");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, [navigate, filter]);

  return (
    <>
      <div className="flex items-center justify-between mt-6 mb-3">
        <div className="font-semibold text-lg">Send money to</div>
        <div className="text-sm text-slate-500">Select a recipient</div>
      </div>

      <div className="mb-3">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 border rounded-md border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-300"
          aria-label="Search users"
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-white rounded-xl shadow-sm p-3 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center font-semibold text-white"
          style={{
            background: "linear-gradient(135deg,#06b6d4 0%,#7c3aed 100%)",
          }}
        >
          {user.firstName?.[0] || "U"}
        </div>

        <div className="flex flex-col">
          <div className="font-medium text-slate-900">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-slate-500">
            {user.handle} • last {user.last}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-900">
            {formatCurrency(user.balance || 0)}
          </div>
          <div className="text-xs text-slate-400">available</div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
