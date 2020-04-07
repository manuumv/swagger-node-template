import { JsonRefsOptions, resolveRefsAt, RetrievedResolvedRefsResults } from 'json-refs';
import { load } from 'js-yaml';

const root = load('swagger/docs/index.yaml') as string;
const options: JsonRefsOptions = {
  filter: ['relative', 'remote'],
  loaderOptions: {
    processContent: (res: any, callback: (_: any, response: any) => void) => (
      callback(undefined, load(res.text))
    )
  }
};

const resolvedJSON = async (): Promise<object> => {
  const results: RetrievedResolvedRefsResults = await resolveRefsAt(root, options);
  return results.resolved;
};

export const swaggerDoc = resolvedJSON;
