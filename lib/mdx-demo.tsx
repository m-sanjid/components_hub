import React from "react";

export async function getComponentDemoOnly(slug: string) {
  try {
    const mod = await import(`../data/components/demo/${slug}.tsx`);
    const DemoComponent = mod.default;
    return <DemoComponent />;
  } catch (e) {
    let errorMsg = "";
    if (e instanceof Error) {
      errorMsg = e.message;
    } else {
      errorMsg = String(e);
    }
    return (
      <div>
        <div>Demo not available</div>
        <div style={{ color: "red", fontSize: "0.9em" }}>{errorMsg}</div>
      </div>
    );
  }
}
