import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote-client/serialize';
import { Markdown } from 'src/components/Markdown';
import { getLetsCozinhaPoliticas } from 'src/cms/singleTypes';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

type Props = {
  compiledSource: string;
  asideData: AsideData;
};

export default function TermosDeUso({ compiledSource }: Props) {
  return (
    <>
      <Head>
        <title>{getPageTitle('Termos de Uso')}</title>
        <meta
          name="description"
          content="Termos de uso do site Lets Cozinha."
        />
        <link rel="canonical" href={getUrl('/termos-de-uso')} />
      </Head>
      <Markdown compiledSource={compiledSource} />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [politicasResult, asideDataResult] = await Promise.allSettled([
    getLetsCozinhaPoliticas(),
    getAsideData(),
  ]);

  if (politicasResult.status === 'rejected') {
    return { notFound: true };
  }

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  const serializeResult = await serialize({
    source: politicasResult.value.letsCozinhaPoliticas.termos_de_uso ?? '',
  });

  return {
    props: {
      compiledSource: 'compiledSource' in serializeResult ? serializeResult.compiledSource : '',
      asideData,
    },
    revalidate: 3600,
  };
};
