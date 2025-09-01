import './AxiosConfig';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './views/Login';
import RunScript from './views/RunScript';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/RunScript" element={<RunScript />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
