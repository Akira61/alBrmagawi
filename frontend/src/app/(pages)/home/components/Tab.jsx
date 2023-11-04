import Box from "@/app/(components)/ctf/Box";

export default function Tab({ active, href, label }) {
  return (
    <li class="mr-4">
      <Box active={active}>
        <a href={href} aria-current="page" className="inline-block p-4 active">
          {label}
        </a>
      </Box>
    </li>
  );
}
