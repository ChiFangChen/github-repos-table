import React, { ChangeEvent, useState, useCallback, useRef, useEffect } from 'react';
import { debounce } from 'ts-debounce';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
// import Pagination from '@material-ui/lab/Pagination';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import dayjs from 'dayjs';

import useGetRepos from 'hooks/useGetRepos';
import LanguageSwitcher from 'components/LanguageSwitcher';
import TopButton from 'components/TopButton';

import { AppWrapper, AppContent, SearchBlock, TextField, RepoTableWrapper } from './styles';

function Main() {
  /* i18n */

  const {
    t,
    i18n: { language: i18nLanguage },
  } = useTranslation();

  /* main data */

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [order, setOrder] = useState('none'); // h:desc / l:asc / none

  const { isLoading, isDone, data, fetch } = useGetRepos({
    search,
    language,
    page,
    order,
  });

  const debounceFetch = useCallback(debounce(fetch, 500), []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // init page
    setPage(1);
    debounceFetch();
  };

  useEffect(() => {
    if (isDone) repoListRef.current?.scrollTo(0, 0);
  }, [isDone]);

  /* scroll */

  const [showTopBtn, setShowTopBtn] = useState(false);

  const repoListRef = useRef<HTMLDivElement>(null);

  const onTopBottomClick = (): void =>
    repoListRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

  const onListScroll = useCallback(() => {
    if (!repoListRef.current) return;

    // clientHeight + scrollTop = scrollHeight
    const { scrollTop } = repoListRef.current;

    console.log(scrollTop);

    if (scrollTop > 100) setShowTopBtn(true);
    else setShowTopBtn(false);
  }, [repoListRef]);

  const onRowClick = (url: string) => () => {
    window.open(url);
  };

  useEffect(() => {
    const repoList = repoListRef.current;
    if (repoList) repoList.addEventListener('scroll', onListScroll);
    return () => {
      if (repoList) repoList.removeEventListener('scroll', onListScroll);
    };
  }, [onListScroll]);

  const getStarCount = (count: number): string => {
    if (`${count}`.length >= 4) return `${Math.round(count / 100) / 10} k`;
    return String(count);
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
            className="input"
          />
        </SearchBlock>

        <RepoTableWrapper ref={repoListRef}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('name')}</TableCell>
                  <TableCell className="sort-cell" onClick={switchSortOrder}>
                    {t('stars')}
                  </TableCell>
                  <TableCell>{t('language')}</TableCell>
                  <TableCell>{t('license')}</TableCell>
                  <TableCell>{t('lastPushedAt')}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data &&
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
                  })}
              </TableBody>
            </Table>

            {/* <Pagination count={10} color="secondary" /> */}
          </TableContainer>

          <TopButton show={showTopBtn} onClick={onTopBottomClick} />
        </RepoTableWrapper>
      </AppContent>
    </AppWrapper>
  );
}

export default Main;
