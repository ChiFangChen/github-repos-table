import styled from 'styled-components';
import MaterialTextField from '@material-ui/core/TextField';

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
  flex: 1;
  overflow: scroll;

  .row {
    cursor: pointer;
  }

  .star-cell {
    white-space: nowrap;

    svg {
      vertical-align: bottom;
    }
  }
`;
