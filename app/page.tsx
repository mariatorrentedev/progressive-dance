"use client";
import BackendProvider from "../context/backend";
import { Header } from "../components/Header";
import DataProvider from "../context/data";

function MyApp() {
  return (
    <main>
      <BackendProvider>
        <DataProvider>
          <Header />
        </DataProvider>
      </BackendProvider>
    </main>
  );
}

export default MyApp;
