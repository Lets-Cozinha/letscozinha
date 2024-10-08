import { PagesNav } from './PagesNav';

export function HeaderNav({ isColumn }: { isColumn?: boolean }) {
  return (
    <PagesNav
      isHeader
      className={`flex gap-sm md:gap-lg text-xl [&>a]:no-underline ${
        isColumn ? 'flex-col' : ''
      }`}
    />
  );
}
