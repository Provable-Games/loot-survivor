import Hints from "@/app/components/interlude/Hints";

export default function InterludeScreen() {
  return (
    <>
      <div className="fixed inset-0 left-0 right-0 bottom-0 opacity-80 bg-terminal-black z-40 sm:m-2 w-full h-full" />
      <div className="fixed inset-0 z-40 w-full h-full sm:py-8 2xl:py-20">
        <h1 className="text-center loading-ellipsis">Loading Entropy</h1>
        <div className="flex justify-center items-center h-3/4">
          <Hints />
        </div>
      </div>
    </>
  );
}
