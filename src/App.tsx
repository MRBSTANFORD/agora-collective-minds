
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
import ApiSetupGuide from "./pages/ApiSetupGuide";
import UserGuide from "./pages/UserGuide";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/eight-immortal-minds" element={<EightImmortalMinds />} />
          <Route path="/iterative-discourse" element={<IterativeDiscourse />} />
          <Route path="/synthesis-of-wisdom" element={<SynthesisOfWisdom />} />
          <Route path="/transcendent-insights" element={<TranscendentInsights />} />
          <Route path="/api-setup-guide" element={<ApiSetupGuide />} />
          <Route path="/user-guide" element={<UserGuide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
