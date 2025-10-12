import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./Tooltip";
import { SonnerToaster } from "./SonnerToaster";
import { ScrollToHashElement } from "./ScrollToHashElement";
import { CurrencyProvider } from "../helpers/useCurrency";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute “fresh” window
    },
  },
});

export const GlobalContextProviders = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <ScrollToHashElement />
        <TooltipProvider>
          {children}
          <SonnerToaster />
        </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
};