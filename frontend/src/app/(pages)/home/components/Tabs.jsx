import Tab from "./Tab";

export default function Tabs({
  tabs,
  paths,
  slicePathEnd,
  isCurrentPath,
  className = "",
}) {
  return (
    <div className={className}>
      <hr />
      <ul
        className={`flex my-2 flex-wrap text-sm font-medium text-center text-gray-400`}
      >
        {tabs.map(({ href, label, children }) => (
          <Tab
            key={href}
            active={isCurrentPath(href)}
            href={`/${paths.slice(0, -slicePathEnd).join("/")}/${href}${children?.length ? `/${children[0].href}` : ""}`}
            label={label}
          />
        ))}
      </ul>
      <hr />
    </div>
  );
}
