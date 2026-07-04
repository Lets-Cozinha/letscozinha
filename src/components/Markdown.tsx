import { MDXClient, type MDXClientProps } from 'next-mdx-remote-client/csr';

const components: MDXClientProps['components'] = {
  // break-words evita overflow horizontal com palavras/URLs longas do CMS;
  // tabelas viram blocos roláveis em vez de alargar a página no mobile
  wrapper: ({ children }) => (
    <section className="max-w-article break-words [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto">
      {children}
    </section>
  ),
};

export function Markdown(props: MDXClientProps) {
  return (
    <MDXClient
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
