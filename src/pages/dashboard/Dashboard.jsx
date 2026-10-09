import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>
      <nav className="subnav">
        <NavLink to="/dashboard" end>Overview</NavLink>
        <NavLink to="/dashboard/profile">Profile</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
