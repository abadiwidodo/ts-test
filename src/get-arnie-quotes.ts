import { httpGet } from './mock-http-interface';

type ArnieQuote = {
  'Arnie Quote': string;
}

type Error = {
  'FAILURE': string;
}

type TResult = ArnieQuote | Error;

type HttpGetResponse = {
  status: number,
  body: string
}

const parseResponseToArnieQuote = (response: HttpGetResponse): TResult => {
  const { message } = JSON.parse(response.body);
  if (response.status === 200) {
    return { 'Arnie Quote': message };
  } else {
    return { 'FAILURE': message };
  }
}

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const requests: Promise<HttpGetResponse>[] = urls.map(url => (httpGet(url)));
  const responses = await Promise.all(requests);
  return responses.map(parseResponseToArnieQuote);
};
