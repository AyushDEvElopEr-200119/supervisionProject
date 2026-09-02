import React, { useState } from "react";
import {
  ArrowLeft, ChevronDown, Edit3, Plus, ShieldCheck, Trash2, Users
} from "lucide-react";
import ActionMenu from "./ActionMenu";

const initialRoles = [
  {
    name: "Super Admin",
    users: "1 User",
    tone: "purple",
    permissions: ["View dashboard", "Manage products", "Manage orders", "Manage customers", "+3 more"]
  },
  {
    name: "Admin",
    users: "2 Users",
    tone: "green",
    permissions: ["View dashboard", "Manage products", "Manage orders", "+1 more"]
  },
  {
    name: "Order Manager",
    users: "3 Users",
    tone: "orange",
    permissions: ["View dashboard", "Manage orders"]
  }
];

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedTab, setSelectedTab] = useState("Roles & Permissions");

  const addRole = () => {
    const next = {
      name: `New Role ${roles.length + 1}`,
      users: "0 Users",
      tone: "blue",
      permissions: ["View dashboard"]
    };
    setRoles([...roles, next]);
  };

  const deleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  return (
    <section className="roles-page">
      <button className="back-dashboard">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="roles-heading">
        <h1>Profiles &amp; Settings</h1>
        <p>Manage your account and system settings</p>
      </div>

      <div className="settings-tabs">
        {["Profile", "Security", "Roles & Permissions"].map((tab) => (
          <button
            key={tab}
            className={selectedTab === tab ? "active" : ""}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="roles-container card">
        <div className="roles-header">
          <div>
            <h2>Roles &amp; Permissions</h2>
            <p>Manage user roles and their access permissions</p>
          </div>
          <button className="primary-btn" onClick={addRole}>
            <Plus size={16} /> Add Role
          </button>
        </div>

        <div className="role-list">
          {roles.map((role, index) => (
            <div className="role-card" key={`${role.name}-${index}`}>
              <div className={`role-icon ${role.tone}`}>
                {role.name === "Super Admin" ? <ShieldCheck size={23} /> :
                 role.name === "Admin" ? <Users size={23} /> :
                 <span className="clipboard-icon">▣</span>}
              </div>

              <div className="role-content">
                <h3>{role.name}</h3>
                <div className="role-users"><Users size={15} /> {role.users}</div>
                <div className="permission-pills">
                  {role.permissions.map((permission) => (
                    <span key={permission}>{permission}</span>
                  ))}
                </div>
              </div>

              <div className="role-actions">
                <ActionMenu itemName={role.name} onDelete={() => deleteRole(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
