import React, { Suspense } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-tw';
import 'fontsource-roboto';
import 'normalize.css';

import Spinner from 'components/Spinner';
import Main from 'pages/Main';

import './i18n.ts';
import './index.css';

dayjs.extend(relativeTime);

function App() {
  return (
    <Suspense fallback={<Spinner wrapperHeight="100vh" />}>
      <Main />
    </Suspense>
  );
}

export default App;
