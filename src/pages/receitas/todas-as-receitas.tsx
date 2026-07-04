import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { getAllSimplifiedRecipes, type SimplifiedRecipe } from 'src/cms/recipes';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';

type Props = {
  recipes: SimplifiedRecipe[];
};

export default function TodasAsReceitas({ recipes }: Props) {
  return (
    <>
    <Head>
      <title>{getPageTitle('Todas as Receitas')}</title>
      <meta name="description" content="Lista completa de todas as receitas do Lets Cozinha." />
      <link rel="canonical" href={getUrl('/receitas/todas-as-receitas')} />
      <meta property="og:title" content={getPageTitle('Todas as Receitas')} />
      <meta property="og:description" content="Lista completa de todas as receitas do Lets Cozinha." />
      <meta property="og:url" content={getUrl('/receitas/todas-as-receitas')} />
      <meta property="og:type" content="website" />
    </Head>
    <div>
      <h1>Todas as receitas</h1>
      <p className="text-text-light">
        Número total de receitas: <strong>{recipes.length}</strong>
      </p>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.documentId}>
            <Link href={`/receitas/${recipe.slug}`}>{recipe.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { allSimplifiedRecipes } = await getAllSimplifiedRecipes().catch(
    () => ({ allSimplifiedRecipes: [] })
  );

  const sorted = [...allSimplifiedRecipes].sort((a, b) =>
    a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0
  );

  return {
    props: { recipes: sorted },
    revalidate: 3600,
  };
};
