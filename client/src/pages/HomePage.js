import React from "react";
import Layout from "../components/Layout/Layout.js";
import { useAuth } from "../context/auth.js";


const HomePage = () => {
  const  [auth, setAuth] = useAuth()
  return (
    <Layout>
      <div>
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </Layout>
  );
};

export default HomePage;
