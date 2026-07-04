import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getEbook } from 'src/cms/ebooks';

export default function EbookMd() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const slug = params?.slug as string;
  const ebook = await getEbook({ slug });

  if (!ebook) {
    res.statusCode = 404;
    res.end('Not found');
    return { props: {} };
  }

  const preco = ebook.preco
    ? `R$ ${ebook.preco.toFixed(2).replace('.', ',')}`
    : 'Consulte o site';

  const lines = [
    `# ${ebook.titulo}`,
    '',
    ebook.subtitulo ? `**${ebook.subtitulo}**` : '',
    '',
    ebook.meta_descricao || '',
    '',
    `**Preço**: ${preco}`,
    ...(ebook.checkout_url ? [`**Comprar**: ${ebook.checkout_url}`] : []),
    `**URL**: ${BASE_URL}/ebooks/${ebook.slug}`,
    '',
    '---',
    '',
    ebook.pagina_website || ebook.descricao || '',
  ].filter((line, i, arr) => !(line === '' && arr[i - 1] === ''));

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(lines.join('\n'));
  res.end();

  return { props: {} };
};
