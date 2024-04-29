import BackendProvider from "../context/backend";
import { Header } from "../components/Header";
import DataProvider from "../context/data";

export default function App() {
  return (
    <BackendProvider>
      <DataProvider>
        <Header />
      </DataProvider>
    </BackendProvider>
  );
}
