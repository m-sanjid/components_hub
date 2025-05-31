export const ComponentPreview = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="group border-border bg-background my-8 flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-xl border p-4">
      <div className="relative">{children}</div>
    </div>
  );
};
