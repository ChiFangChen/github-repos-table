import React, { ChangeEvent, useState, useCallback, useEffect } from 'react';
import { debounce } from 'ts-debounce';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  SelectProps,
  MenuItem,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { per_page, max_page } from 'utils/variables';
import { popularLanguages } from 'utils/options';
import useGetRepos from 'hooks/useGetRepos';
import LanguageSwitcher from 'components/LanguageSwitcher';
import Spinner from 'components/Spinner';
import TopButton from 'components/TopButton';

import {
  AppWrapper,
  AppContent,
  SearchBlock,
  TextField,
  RepoTableWrapper,
  LoadingTableRow,
} from './styles';

function Main() {
  /* i18n */

  const {
    t,
    i18n: { language: i18nLanguage },
  } = useTranslation();

  /* main data */

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('any');
  const [order, setOrder] = useState('desc'); // h:desc / l:asc

  const { isLoading, isDone, data, fetch } = useGetRepos({
    search,
    language,
    page,
    order,
  });

  const paginationCount = data ? Math.ceil(data.total_count / per_page) : 0;

  const debounceFetch = useCallback(debounce(fetch, 500), []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // init page
    setPage(1);
    debounceFetch();
  };

  const handleLanguageChange: SelectProps['onChange'] = (event) => {
    setPage(1);
    if (event.target.value) setLanguage(event.target.value as string);
  };

  const switchSortOrder = () => {
    setPage(1);
    setOrder((oldState) => (oldState === 'desc' ? 'asc' : 'desc'));
  };

  const onPaginationChange = (event: object, page: number) => {
    setPage(page);
  };

  /* scroll */

  const [showTopBtn, setShowTopBtn] = useState(false);

  const onTopBottomClick = (): void =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

  const onListScroll = useCallback(() => {
    // clientHeight + scrollTop = scrollHeight
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) setShowTopBtn(true);
    else setShowTopBtn(false);
  }, []);

  useEffect(() => {
    if (isDone) window.scrollTo(0, 0);
  }, [isDone]);

  useEffect(() => {
    window.addEventListener('scroll', onListScroll);
    return () => {
      window.removeEventListener('scroll', onListScroll);
    };
  }, [onListScroll]);

  const getStarCount = (count: number): string => {
    if (`${count}`.length >= 4) return `${Math.round(count / 100) / 10} k`;
    return String(count);
  };

  const onRowClick = (url: string) => () => {
    window.open(url);
  };

  return (
    <AppWrapper>
      <Typography align="center" variant="h3" component="h1">
        {t('heading')}
      </Typography>

      <LanguageSwitcher />

      <AppContent>
        <SearchBlock>
          <TextField
            label={t('searchLabel')}
            value={search}
            onChange={handleSearchChange}
            className="input search"
          />

          <Select
            label={t('language')}
            value={language}
            onChange={handleLanguageChange}
            className="lan"
          >
            <MenuItem value="any">{t('anyLanguages')}</MenuItem>
            {popularLanguages.map((lan) => (
              <MenuItem key={lan} value={lan}>
                {lan}
              </MenuItem>
            ))}
          </Select>
        </SearchBlock>

        <RepoTableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('name')}</TableCell>
                  <TableCell className="sort-cell" onClick={switchSortOrder}>
                    {t('stars')}
                    {order === 'desc' && <ArrowUpwardIcon />}
                    {order === 'asc' && <ArrowDownwardIcon />}
                  </TableCell>
                  <TableCell>{t('language')}</TableCell>
                  <TableCell>{t('license')}</TableCell>
                  <TableCell>{t('lastPushedAt')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!data || !data.items.length ? (
                  <LoadingTableRow>
                    <TableCell colSpan={5}>{isLoading ? <Spinner /> : t('noData')}</TableCell>
                  </LoadingTableRow>
                ) : (
                  data.items.map((repo, i: number) => {
                    return (
                      <TableRow
                        key={`${repo.id}${i}`}
                        className="row"
                        onClick={onRowClick(repo.svn_url)}
                      >
                        <TableCell component="th" scope="row">
                          {repo.full_name}
                        </TableCell>
                        <TableCell className="star-cell">
                          <StarBorderIcon />
                          {getStarCount(repo.stargazers_count)}
                        </TableCell>
                        <TableCell>{repo.language}</TableCell>
                        <TableCell>{repo.license?.name}</TableCell>
                        <TableCell>
                          {dayjs(repo.pushed_at).locale(i18nLanguage).fromNow()}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {!(!data || !data.items.length) && (
            <div className="pagination-block">
              <Pagination
                count={paginationCount < max_page ? paginationCount : max_page}
                color="secondary"
                page={page}
                onChange={onPaginationChange}
              />
            </div>
          )}

          {isLoading && !!data?.items.length && (
            <div className="spinner-block">
              <Spinner />
            </div>
          )}

          <TopButton show={showTopBtn} onClick={onTopBottomClick} />
        </RepoTableWrapper>
      </AppContent>
    </AppWrapper>
  );
}

export default Main;
