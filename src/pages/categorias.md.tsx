import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getAllCategories } from 'src/cms/categories';

export default function CategoriasMd() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { allCategories } = await getAllCategories();

  const lines = [
    '# Categorias - Lets Cozinha',
    '',
    '> Receitas do Lets Cozinha organizadas por categoria culinária.',
    '',
    `Total: ${allCategories.length} categorias`,
    '',
    '## Categorias',
    '',
    ...allCategories.map((c) => {
      const desc = c.descricao ? `: ${c.descricao}` : '';
      return `- [${c.nome}](${BASE_URL}/categorias/${c.slug}.md)${desc}`;
    }),
  ];

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
};
