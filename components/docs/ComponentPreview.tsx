export const ComponentPreview = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="group border-border bg-background my-8 p-4 flex justify-center items-center w-full overflow-hidden rounded-xl border min-h-[200px]">
      <div className="relative">{children}</div>
    </div>
  );
};