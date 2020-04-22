import React from 'react';
import PaypalButton from './PaypalButton';

const CLIENT = {
    sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
    production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
  };

const CLIENT = {
  sandbox: 'ASgZQ7qqy5JXawT3D5yhLKlvF3zSOb2badjUGN_htTyHoO4PtizLQ_RP_7EhANDhmPfWBDyazrlYLYBf',
  production: 'EPpNI78hqgzZVdTCWozjRo7lCrz5756P5OeKf2zlHpHuyUyKVD2gwTVo2cvJUe6T6cvezbNKlCfbEnu5',
};
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';
class App extends React.Component {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);
    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) =>
      console.log('Cancelled payment!', data);
    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}
export default App;