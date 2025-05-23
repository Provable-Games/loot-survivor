"use client";

import BurnerLoader from "@/app/components/animations/BurnerLoader";
import Intro from "@/app/components/intro/Intro";
import LoginIntro from "@/app/components/onboarding/Intro";
import { ControllerProvider } from "@/app/context/ControllerContext";
import { DojoProvider } from "@/app/dojo/DojoContext";
import { setup } from "@/app/dojo/setup";
import "@/app/globals.css";
import Head from "@/app/head";
import useUIStore from "@/app/hooks/useUIStore";
import { gameClient, tournamentClient } from "@/app/lib/clients";
import { StarknetProvider } from "@/app/provider";
import { ApolloProvider } from "@apollo/client";
import { BurnerManager } from "@dojoengine/create-burner";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { RpcProvider } from "starknet";
import TemporaryOutage from "./components/intro/TemporaryOutage";
import { networkConfig } from "./lib/networkConfig";

type SetupResult = {
  config: {
    masterAddress: string;
    masterPrivateKey: string;
  };
  burnerManager: BurnerManager;
  dojoProvider: RpcProvider;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = useUIStore((state) => state.network);
  const [introComplete, setIntroComplete] = useState(false);
  const [setupResult, setSetupResult] = useState<SetupResult | null>(null);
  const [createBurner, setCreateBurner] = useState(false);

  const temporaryOutage = process.env.NEXT_PUBLIC_TEMPORARY_OUTAGE === "true";

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  useEffect(() => {
    async function initializeSetup() {
      if (network) {
        const result = await setup({
          rpcUrl: networkConfig[network].rpcUrl!,
          network,
          setCreateBurner,
        });
        setSetupResult(result);
      }
    }
    initializeSetup();
  }, [network]);

  return (
    <html lang="en">
      <Head />
      <body
        suppressHydrationWarning={false}
        className="min-h-screen overflow-hidden text-terminal-green bg-conic-to-br to-terminal-black from-terminal-black bezel-container"
      >
        <Analytics />
        <img
          src="/crt_green_mask.png"
          alt="crt green mask"
          className="absolute w-full pointer-events-none crt-frame hidden sm:block"
        />
        {!network || !setupResult ? (
          <main
            className={`min-h-screen container mx-auto flex flex-col sm:pt-8 sm:p-8 lg:p-10 2xl:p-20 `}
          >
            {temporaryOutage ? (
              <TemporaryOutage />
            ) : introComplete ? (
              <>
                <LoginIntro />
                {createBurner && <BurnerLoader />}
              </>
            ) : (
              <Intro onIntroComplete={handleIntroComplete} />
            )}
          </main>
        ) : (
          <ApolloProvider client={gameClient(networkConfig[network].lsGQLURL!)}>
            <ApolloProvider
              client={tournamentClient(
                networkConfig[network].tournamentGQLURL!
              )}
            >
              <ControllerProvider>
                <StarknetProvider network={network}>
                  <DojoProvider value={setupResult}>{children}</DojoProvider>
                </StarknetProvider>
              </ControllerProvider>
            </ApolloProvider>
          </ApolloProvider>
        )}
      </body>
    </html>
  );
}
