import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getAllEbooks } from 'src/cms/ebooks';

export default function EbooksMd() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { allEbooks } = await getAllEbooks();

  const lines = [
    '# E-books - Lets Cozinha',
    '',
    '> Coleção de e-books culinários digitais criados pela Lets. Cada e-book reúne receitas temáticas exclusivas em PDF.',
    '',
    `Total: ${allEbooks.length} e-books`,
    '',
    '## E-books',
    '',
    ...allEbooks.map((e) => {
      const preco = e.preco ? `R$ ${e.preco.toFixed(2).replace('.', ',')}` : '';
      const subtitle = e.subtitulo ? ` — ${e.subtitulo}` : '';
      const price = preco ? ` (${preco})` : '';
      return `- [${e.titulo}](${BASE_URL}/ebooks/${e.slug}.md)${subtitle}${price}`;
    }),
  ];

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
};
