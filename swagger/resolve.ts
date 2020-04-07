import { JsonRefsOptions, resolveRefsAt, RetrievedResolvedRefsResults } from 'json-refs';
import { safeLoad } from 'js-yaml';

const root = safeLoad('swagger/docs/index.yaml');
const options: JsonRefsOptions = {
  filter: ['relative', 'remote'],
  loaderOptions: {
    processContent: (res: any, callback: (_: any, response: any) => void) => (
      callback(undefined, safeLoad(res.text))
    )
  }
};

const resolvedJSON = async (): Promise<object> => {
  const results: RetrievedResolvedRefsResults = await resolveRefsAt(root, options);
  return results.resolved;
};

export const swaggerDoc = resolvedJSON;
