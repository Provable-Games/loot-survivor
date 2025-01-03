import { TournamentTrophyIcon } from "@/app/components/icons/Icons";
import { getOrdinalSuffix } from "@/app/lib/utils";
import Lords from "public/icons/lords.svg";
import { useEffect, useState } from "react";

interface Prizes {
  prizes: any;
  lordsDollarValue: () => Promise<bigint>;
}

const Prizes = ({ prizes, lordsDollarValue }: Prizes) => {
  const formattedPrizes = prizes.lsTournamentsV0TournamentPrizeModels.edges;
  const [lordsDollar, setLordsDollar] = useState<bigint>(0n);

  const handleLordsDollarValue = async () => {
    const value = await lordsDollarValue();
    setLordsDollar(value);
  };

  useEffect(() => {
    handleLordsDollarValue();
  }, []);

  return (
    <>
      {Object.entries(
        formattedPrizes.reduce((acc: any, prize: any) => {
          const key = prize.node.token;
          const isERC20 = prize.node.token_data_type.option === "erc20";
          if (isERC20) {
            if (!acc[key]) acc[key] = [];
            acc[key].push(prize.node);
          } else {
            acc[key] = [prize.node];
          }
          console.log(acc);
          return acc;
        }, {} as Record<string, typeof prizes>)
      ).map(([token, prizes]: [string, any], index) => {
        const variant = prizes[0].token_data_type.option as "erc20" | "erc721";
        return (
          <div
            key={index}
            className="flex flex-row gap-5 overflow-scroll default-scroll"
          >
            {prizes.map((prize: any, index: any) => {
              const isERC20 = variant === "erc20";
              const tokenValue = Number(
                isERC20
                  ? prize.token_data_type.erc20?.token_amount
                  : prize.token_data_type.erc721?.token_id
              );

              return (
                <span key={index} className="flex flex-row items-center gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    {prize.payout_position <= 3 && (
                      <span
                        className={`w-4 h-4 sm:w-8 sm:h-8 ${
                          prize.payout_position === 1
                            ? "text-terminal-gold"
                            : prize.payout_position === 2
                            ? "text-terminal-silver"
                            : "text-terminal-bronze"
                        }`}
                      >
                        <TournamentTrophyIcon />
                      </span>
                    )}
                    <p className="flex text-2xl">
                      {prize.payout_position}
                      <sup className="text-sm">
                        {getOrdinalSuffix(prize.payout_position).slice(1)}
                      </sup>
                    </p>
                  </div>
                  <span className="hidden sm:flex text-2xl">-</span>
                  <Lords className="self-center w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span className="text-terminal-green text-2xl">
                    $
                    {(
                      (tokenValue * Number(lordsDollar)) /
                      10 ** 8 /
                      10 ** 18
                    ).toFixed(2)}
                  </span>
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Prizes;
