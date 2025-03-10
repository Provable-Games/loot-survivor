const TemporaryOutage = () => {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        Survivors, we are experiencing an issue with VRF.
      </h1>
      <p className="text-lg">We&apos;ll be back soon.</p>
    </div>
  );
};

export default TemporaryOutage;
