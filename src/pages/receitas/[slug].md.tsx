import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getRecipe, searchSimilarRecipes } from 'src/cms/recipes';
import { getRecommendedEbook } from 'src/cms/recipes';

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

  const [similarRecipes, recommendedEbook] = await Promise.all([
    searchSimilarRecipes({ recipe }).catch(() => []),
    getRecommendedEbook(recipe).catch(() => null),
  ]);

  const categories = recipe.categorias?.map((c) => c.nome).join(', ') || '';

  const lines: string[] = [
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

  if (recommendedEbook) {
    const preco = recommendedEbook.preco
      ? ` — R$ ${recommendedEbook.preco.toFixed(2).replace('.', ',')}`
      : '';
    lines.push(
      '',
      '---',
      '',
      '## E-book Recomendado',
      '',
      `**[${recommendedEbook.titulo}](${BASE_URL}/ebooks/${recommendedEbook.slug}.md)**${preco}`,
      '',
      recommendedEbook.subtitulo || '',
      '',
      recommendedEbook.meta_descricao || '',
      ...(recommendedEbook.checkout_url
        ? [``, `**Comprar**: ${recommendedEbook.checkout_url}`]
        : []),
    );
  }

  if (similarRecipes.length > 0) {
    lines.push(
      '',
      '---',
      '',
      '## Receitas Similares',
      '',
      ...similarRecipes.map(
        (r) => `- [${r.nome}](${BASE_URL}/receitas/${r.slug}.md)`
      ),
    );
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
};
