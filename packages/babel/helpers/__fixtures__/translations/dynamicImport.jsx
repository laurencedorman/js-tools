import React from 'react';
import { FormattedMessage } from 'react-intl';

const LazyRoute = ({ exact, path, module }) => null;

const Dummy = () => {
  return (
    <>
      <FormattedMessage id="dynamicKey.key" />
      <LazyRoute exact path="/path" module={() => import('path')} />
    </>
  );
};

export default Dummy;
