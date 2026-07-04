import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getAllSimplifiedRecipes } from 'src/cms/recipes';

export default function ReceitasMd() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { allSimplifiedRecipes } = await getAllSimplifiedRecipes();

  const lines = [
    '# Receitas - Lets Cozinha',
    '',
    '> Lista completa de receitas culinárias gratuitas do Lets Cozinha. Cada receita tem uma página com ingredientes e modo de preparo detalhado.',
    '',
    `Total: ${allSimplifiedRecipes.length} receitas`,
    '',
    '## Receitas',
    '',
    ...allSimplifiedRecipes.map(
      (r) => `- [${r.nome}](${BASE_URL}/receitas/${r.slug}.md)`
    ),
  ];

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
};
