import styled from 'styled-components';
import MaterialTextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';

import { MOBILE_MAX } from 'utils/variables';

export const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;

export const SearchBlock = styled.div`
  margin: 0 16px 24px;
  display: flex;

  .search {
    flex: 1;
    margin-right: 12px;
  }

  .lan {
    width: 30%;
  }
`;

export const AppContent = styled.div`
  margin: 0 auto;
  width: 80%;

  @media (max-width: ${MOBILE_MAX}) {
    width: 90%;
  }
`;

export const TextField = styled(MaterialTextField)`
  &.input {
    .Mui-focused {
      &.MuiFormLabel-root {
        color: #914191;
      }
      &.MuiInput-underline:after,
      &.MuiInput-underline:before {
        border-bottom-color: #914191;
      }
    }
    .MuiInput-underline:hover:not(.Mui-disabled):before,
    .MuiInput-underline:hover:after {
      border-bottom: 2px solid #914191;
    }
  }
`;

export const RepoTableWrapper = styled.div`
  position: relative;

  .row {
    cursor: pointer;
  }

  .sort-cell {
    white-space: nowrap;
    cursor: pointer;

    svg {
      font-size: 14px;
      vertical-align: inherit;
    }
  }

  .star-cell {
    white-space: nowrap;

    svg {
      font-size: 16px;
      vertical-align: middle;
    }
  }

  .spinner-block {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 56px;
    background-color: rgb(255 255 255 / 60%);
    display: flex;
    justify-content: center;
  }
`;

export const LoadingTableRow = styled(TableRow)`
  td {
    border: none;
    text-align: center;
  }
`;
