/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import {  NETWORKS, ChainContext } from 'contexts/ChainContext';
import { ConnextModal } from '@connext/vector-modal';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Grid,
  Select,
  GridItem,
  Input,
  Text,
  IconButton,
  Center,
  Circle,
} from '@chakra-ui/react';
import getRpcUrl from 'lib/rpc';

export const CONNEXT_ROUTER =
  'vector52rjrwRFUkaJai2J4TrngZ6doTUXGZhizHmrZ6J15xVv4YFgFC';


export const ASSETS = ['DAI', 'USDC', 'USDT'];

const Modal = ({ disabled }) => {
  const { web3Provider, account } = useContext(Web3Context);
  const [showModal, setShowModal] = useState(false);
  const [withdrawalAddress, setWithdrawalAddress] = useState(account);
  const [helperText, setHelperText] = useState(undefined);
  const [senderOpen, setSenderOpen] = useState(false);
  const [receiverOpen, setReceiverOpen] = useState(false);
  const [assetOpen, setAssetOpen] = useState(false);
  const [asset, setAsset] = useState(ASSETS[0]);
  const [senderChain, setSenderChain] = useState(NETWORKS[1]);
  const [receiverChain, setReceiverChain] = useState(NETWORKS[0]);
  const [showButton, setShowButton] = useState(!disabled);

  const isValidAddress = (input) => {
    const valid = input.match(/0x[0-9a-fA-F]{40}/);
    return !!valid;
  };

  const handleChange = (event) => {
    const [addr, shouldShowButton] = event.target.value.split('-secret');

    if (!isValidAddress(addr.trim())) {
      setHelperText('Must be an Ethereum address');
      setShowButton(false);
      return;
    } else {
      setHelperText(undefined);
    }

    setShowButton(disabled ? shouldShowButton !== undefined : true);
    setWithdrawalAddress(addr.trim());
  };

  const handleSubmit = (values) => {
    const errors = { receiverAddress: '' };

    if (!values.receiverAddress) {
      errors.receiverAddress = 'Required';
    }
    return errors;
  };

  const swapChains = () => {
    const s = senderChain;
    const r = receiverChain;

    setSenderChain(r);
    setReceiverChain(s);
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Select
              id="sender-chain"
              open={senderOpen}
              onClose={() => setSenderOpen(false)}
              onOpen={() => setSenderOpen(true)}
              onChange={(event) => setSenderChain(NETWORKS[event.target.value])}
              fullWidth
              value={NETWORKS.findIndex(
                (n) => n.chainId === senderChain.chainId
              )}
              borderColor="gray.300"
              // component={Select}
            >
              {NETWORKS.map((t, index) => {
                return (
                  <option value={index} key={index}>
                    {t.chainName} - {t.assetName}
                  </option>
                );
              })}
            </Select>
          </GridItem>
          <Center>
            <IconButton
              icon={
                <Circle size="2rem" bg="gray.100">
                  <ArrowUpDownIcon />
                </Circle>
              }
              variant="ghost"
              _hover={{ bg: 'white' }}
              transform="rotate(90deg)"
              onClick={swapChains}
            />
          </Center>
          <GridItem colStart={4} colEnd={6}>
            <Select
              id="receiver-chain"
              open={receiverOpen}
              onClose={() => setReceiverOpen(false)}
              onOpen={() => setReceiverOpen(true)}
              onChange={(event) =>
                setReceiverChain(NETWORKS[event.target.value])
              }
              fullWidth
              value={NETWORKS.findIndex(
                (n) => n.chainId === receiverChain.chainId
              )}
              borderColor="gray.300"
              // component={Select}
            >
              {NETWORKS.map((t, index) => {
                return (
                  <option value={index} key={index}>
                    {t.chainName} - {t.assetName}
                  </option>
                );
              })}
            </Select>
          </GridItem>
        </Grid>
        <Center>
          <Select
            id="asset"
            open={assetOpen}
            onClose={() => setAssetOpen(false)}
            onOpen={() => setAssetOpen(true)}
            onChange={(event) => setAsset(ASSETS[event.target.value])}
            fullWidth
            defaultValue={1}
            value={ASSETS.findIndex((a) => a === asset)}
            borderColor="gray.300"
            maxW="8rem"
            marginTop="1rem"
            // component={Select}
          >
            {ASSETS.map((t, index) => {
              return (
                <option value={index} key={index}>
                  {t}
                </option>
              );
            })}
          </Select>
        </Center>
        <Grid>
          <GridItem>
            <Text mb="8px" fontWeight="light" marginTop="1rem" color="#6E7191">
              Receiver Address*
            </Text>
            <Input
              label="Receiver Address"
              name="receiverAddress"
              aria-describedby="receiverAddress"
              defaultValue={withdrawalAddress}
              onChange={handleChange}
              borderColor="gray.300"
              required
              fullWidth
            />
          </GridItem>
        </Grid>
      </form>

      {helperText && (
        <Grid>
          <GridItem>
            <Text id="helper-text" color="crimson" isTruncated>
              {helperText}
            </Text>
          </GridItem>
        </Grid>
      )}

      <Grid container spacing={2} style={{ justifyContent: 'center' }}>
        <Grid item style={{ marginTop: 24 }}>
          <Button
            isDisabled={
              !withdrawalAddress ||
              !senderChain ||
              !receiverChain ||
              senderChain.chainId === receiverChain.chainId
            }
            bgGradient="linear-gradient(257.5deg, #EB0055 -39.73%, #FFFA80 107.97%)"
            _focus={{ boxShadow: 'outline' }}
            _hover={{
              bg: 'linear-gradient(257.5deg, #EB0055 -39.73%, #FFFA80 107.97%)',
            }}
            fontWeight="light"
            disabled={
              !withdrawalAddress ||
              !senderChain ||
              !receiverChain ||
              !showButton ||
              senderChain.chainId === receiverChain.chainId
            }
            onClick={() => {
              console.log('senderChain: ', senderChain);
              console.log('receiverChain: ', receiverChain);
              console.log(
                'getRpcUrl(senderChain.chainId): ',
                getRpcUrl(senderChain.chainId)
              );
              console.log(
                'getRpcUrl(receiverChain.chainId): ',
                getRpcUrl(receiverChain.chainId)
              );
              setShowModal(true);
            }}
          >
            {disabled ? 'Disabled due to Maintenance' : 'SWAP'}
          </Button>
        </Grid>
      </Grid>

      {web3Provider !== 'undefined' ? (
        <ConnextModal
          showModal={showModal}
          routerPublicIdentifier={CONNEXT_ROUTER}
          depositAssetId={senderChain.assets[asset]}
          depositChainId={senderChain.chainId}
          withdrawAssetId={receiverChain.assets[asset]}
          withdrawChainId={receiverChain.chainId}
          withdrawalAddress={withdrawalAddress}
          onClose={() => setShowModal(false)}
          depositChainProvider={getRpcUrl(senderChain.chainId)}
          withdrawChainProvider={getRpcUrl(receiverChain.chainId)}
          injectedProvider={web3Provider}
          loginProvider={window.ethereum}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Modal;
