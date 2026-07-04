import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getCategory } from 'src/cms/categories';
import { getAllRecipes } from 'src/cms/recipes';

export default function CategoriaMd() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const slug = params?.slug as string;

  const [category, { allRecipes }] = await Promise.all([
    getCategory({ slug }),
    getAllRecipes(),
  ]);

  if (!category) {
    res.statusCode = 404;
    res.end('Not found');
    return { props: {} };
  }

  const categoryRecipes = allRecipes.filter((r) =>
    r.categorias?.some((c) => c.slug === slug)
  );

  const lines = [
    `# ${category.nome}`,
    '',
    category.descricao || '',
    '',
    `**URL**: ${BASE_URL}/categorias/${category.slug}`,
    '',
    `Total: ${categoryRecipes.length} receitas`,
    '',
    '## Receitas',
    '',
    ...categoryRecipes.map(
      (r) => `- [${r.nome}](${BASE_URL}/receitas/${r.slug}.md)`
    ),
  ];

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
};
