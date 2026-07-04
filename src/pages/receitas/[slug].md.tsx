import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getRecipe } from 'src/cms/recipes';

export default function ReceitaMd() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const slug = params?.slug as string;
  const recipe = await getRecipe({ slug });

  if (!recipe) {
    res.statusCode = 404;
    res.end('Not found');
    return { props: {} };
  }

  const categories = recipe.categorias?.map((c) => c.nome).join(', ') || '';

  const lines = [
    `# ${recipe.nome}`,
    '',
    recipe.meta_descricao || recipe.descricao || '',
    '',
    ...(categories ? [`**Categorias**: ${categories}`, ''] : []),
    `**URL**: ${BASE_URL}/receitas/${recipe.slug}`,
    '',
    '---',
    '',
    recipe.receita || '',
  ];

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
};
