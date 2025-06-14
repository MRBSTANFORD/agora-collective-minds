
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EightImmortalMinds from "./pages/EightImmortalMinds";
import IterativeDiscourse from "./pages/IterativeDiscourse";
import SynthesisOfWisdom from "./pages/SynthesisOfWisdom";
import TranscendentInsights from "./pages/TranscendentInsights";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/eight-immortal-minds" element={<EightImmortalMinds />} />
          <Route path="/iterative-discourse" element={<IterativeDiscourse />} />
          <Route path="/synthesis-of-wisdom" element={<SynthesisOfWisdom />} />
          <Route path="/transcendent-insights" element={<TranscendentInsights />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
