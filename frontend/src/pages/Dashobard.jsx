import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";

export const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <div>
        <Balance />
        <Users />
      </div>
    </div>
  );
};
