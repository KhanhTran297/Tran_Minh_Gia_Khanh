import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormSwap from "./components/FormSwap";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FormSwap />
    </QueryClientProvider>
  );
}

export default App;
