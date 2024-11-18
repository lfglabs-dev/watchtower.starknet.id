"use client";

import DashboardMenu from "../components/dashboard/menu";
import { useSearchParams } from "next/navigation";
import styles from "../styles/dashboard.module.css";
import Services from "../components/dashboard/services";
import { useEffect, useMemo, useState } from "react";
import request from "../utils/request";
import { useCookies } from "react-cookie";
import Service from "../components/dashboard/service";
import Users from "../components/dashboard/users";
import Settings from "../components/dashboard/settings";
import Types from "../components/dashboard/types";
import User from "../components/dashboard/user";
import Type from "../components/dashboard/type";
import Logs from "../components/dashboard/logs";
import Databases from "../components/dashboard/dbs";
import Database from "../components/dashboard/db";
import loadDbs from "../components/dashboard/db/loadDbs";

const Dashboard = () => {
  const cookies = useCookies();
  const params = useSearchParams();
  const page = useMemo(() => params.get("page") || "logs", [params]);
  const [services, setServices] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [permissions, setPermissions] = useState<Array<Permission>>([]);
  const [types, setTypes] = useState<Array<Type>>([]);
  const [databases, setDatabases] = useState<Array<Database>>([]);
  const [menu, setMenu] = useState<Menu>(null);

  const token = cookies[0].token;

  useEffect(() => {
    request("/get_services", { token: token }).then((res) => {
      if (res.status === "success") {
        setServices(res.services);
      }
    });
    request("/get_users", { token: token }).then((res) => {
      if (res.status === "success") {
        setUsers(res.users);
      }
    });
    request("/get_permissions", { token: token }).then((res) => {
      if (res.status === "success") {
        setPermissions(res.permissions);
      }
    });
    request("/get_types", { token: token }).then((res) => {
      if (res.status === "success") {
        setTypes(res.types);
      }
    });
    loadDbs(token, setDatabases);
  }, [token]);

  useEffect(() => {
    // Scroll page to top
    window.scrollTo(0, 0);
    const dashboardContainer = document.getElementById("dashboardContainer");
    if (dashboardContainer) dashboardContainer.scrollTo(0, 0);
    console.log("Page changed to", page);
  }, [page]);

  useEffect(() => {
    // Check if any db is connecting
    const connecting = databases.find((db) => db.status === "connecting");
    let timeout: NodeJS.Timeout;
    if (connecting) {
      timeout = setTimeout(() => {
        loadDbs(token, setDatabases);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [databases]);

  return (
    <>
      <div className={styles.container} id="dashboardContainer">
        {page === "services" ? (
          <Services
            setMenu={setMenu}
            services={services}
            setServices={setServices}
            permissions={permissions}
          />
        ) : null}
        {page === "service" ? (
          <Service
            services={services}
            setMenu={setMenu}
            permissions={permissions}
            setServices={setServices}
          />
        ) : null}
        {page === "dbs" ? (
          <Databases
            databases={databases}
            setMenu={setMenu}
            permissions={permissions}
            setDatabases={setDatabases}
          />
        ) : null}
        {page === "db" ? (
          <Database
            databases={databases}
            setMenu={setMenu}
            setDatabases={setDatabases}
          />
        ) : null}
        {page === "logs" ? (
          <Logs services={services} types={types} setMenu={setMenu} />
        ) : null}
        {page === "settings" ? (
          <Settings permissions={permissions} setMenu={setMenu} />
        ) : null}
        {page === "types" ? (
          <Types setMenu={setMenu} types={types} setTypes={setTypes} />
        ) : null}
        {page === "type" ? (
          <Type types={types} setTypes={setTypes} setMenu={setMenu} />
        ) : null}
        {page === "users" ? (
          <Users
            users={users}
            setMenu={setMenu}
            setUsers={setUsers}
            permissions={permissions}
          />
        ) : null}
        {page === "user" ? (
          <User users={users} setUsers={setUsers} setMenu={setMenu} />
        ) : null}
      </div>
      <DashboardMenu permissions={permissions} page={page} />
      {menu}
    </>
  );
};

export default Dashboard;
