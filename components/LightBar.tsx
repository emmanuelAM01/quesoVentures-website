// Animated light beam divider. Pure CSS, no JS.
export default function LightBar() {
  return (
    <div aria-hidden="true" className="relative w-full h-[2px] my-2">
      <div className="lightbar absolute inset-x-0 top-0 h-[2px]" />
      <div className="lightbar absolute inset-x-0 -top-1 h-2 blur-md opacity-70" />
    </div>
  );
}
