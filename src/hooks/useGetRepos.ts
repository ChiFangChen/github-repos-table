import { useEffect } from 'react';
import qs from 'qs';
import { Endpoints } from '@octokit/types';

import useFetch from 'hooks/useFetch';

type ReposResponse = Endpoints['GET /search/repositories']['response']['data'];

type UseGetReposParameter = {
  search: string;
  language: string;
  page: number;
  order: string;
};

const useGetRepos = ({ search, language, page, order }: UseGetReposParameter) => {
  const filterLanguage = language !== 'any';
  const searchText = `${encodeURIComponent(search)}${
    filterLanguage ? `+language:${language}` : ''
  }`;
  const query = qs.stringify(
    {
      ...(searchText ? { q: searchText } : {}),
      page,
      ...(order === 'none'
        ? {}
        : {
            sort: 'stars',
            order,
          }),
    },
    { addQueryPrefix: true },
  );

  const data = useFetch<ReposResponse>({
    path: `/search/repositories${query}`,
  });

  useEffect(() => {
    data.fetch();
  }, []);

  return data;
};

export default useGetRepos;
