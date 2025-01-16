import { Button } from "@/app/components/buttons/Button";
import { DiscordIcon } from "@/app/components/icons/Icons";

export default function GuideScreen() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 h-full w-full p-5">
      <div className="flex flex-col gap-4 items-center">
        <span className="sm:text-xl text-center">
          The docs are here to help you master the game&apos;s mechanics,
          uncover hidden strategies, and make the most of every run. Whether
          you&apos;re delving into the depths for the first time or refining
          your skills for the ultimate challenge, these pages are your go-to
          resource.
        </span>
        <a
          href="https://survivor-docs.realms.world/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size={"lg"}>Survivor Docs</Button>
        </a>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <span className="sm:text-xl text-center">
          If you have any questions or need further assistance, don&apos;t
          hesitate to join <span className="uppercase">Realms World</span>{" "}
          Discord server.
        </span>
        <a
          href="https://discord.gg/realmsworld"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="py-2 px-4 flex flex-row gap-2">
            Join the Discord <DiscordIcon className="w-5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
