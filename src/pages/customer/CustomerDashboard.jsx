import { Outlet } from 'react-router-dom';

const CustomerDashboard = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <Outlet />
    </div>
  );
};

export default CustomerDashboard;
