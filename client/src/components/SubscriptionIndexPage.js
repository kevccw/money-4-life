import React, { useState, useEffect, useContext } from 'react';
import { Subscription } from '../requests';
import { Spinner } from '@chakra-ui/spinner';
import { Flex } from '@chakra-ui/layout';
import AuthContext from '../context/auth-context';

const SubscriptionIndexPage = (props) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [dataReturned, setDataReturned] = useState(false);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    Subscription.index().then((subscriptions) => {
      subscriptions = subscriptions.filter((s) => s.user_id === ctx.user.id);
      setSubscriptions(subscriptions);
      setDataReturned(true);
    });
  }, []);
  return (
    <div>
      {dataReturned ? (
        <Flex
          flexDir='column'
          w='100%'
          justifyContent='center'
          alignItems='center'
        >
          {subscriptions.map((subscription) => {
            return (
              <h3>
                {subscription.name} - {subscription.amount} -{' '}
                {subscription.billing_period} - {subscription.user_id}
              </h3>
            );
          })}
        </Flex>
      ) : (
        <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
          <Spinner
            size='xl'
            thickness='4px'
            emptyColor='gray.200'
            color='blue.300'
          />
        </Flex>
      )}
    </div>
  );
};

export default SubscriptionIndexPage;
