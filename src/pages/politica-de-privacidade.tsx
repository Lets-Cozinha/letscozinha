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

export default function PoliticaDePrivacidade({ compiledSource }: Props) {
  return (
    <>
      <Head>
        <title>{getPageTitle('Política de Privacidade')}</title>
        <meta
          name="description"
          content="Política de privacidade do Lets Cozinha: como coletamos, usamos e protegemos seus dados."
        />
        <link rel="canonical" href={getUrl('/politica-de-privacidade')} />
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
    source: politicasResult.value.letsCozinhaPoliticas.politica_de_privacidade ?? '',
  });

  return {
    props: {
      compiledSource: 'compiledSource' in serializeResult ? serializeResult.compiledSource : '',
      asideData,
    },
    revalidate: 3600,
  };
};
