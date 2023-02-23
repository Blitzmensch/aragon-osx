import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import buildMetadataJson from '../../src/plugins/governance/multisig/build-metadata.json';
import {findEvent} from '../../utils/event';

import {checkPermission, getContractAddress} from '../helpers';
import {EHRE, Operation} from '../../utils/types';
import {hashHelpers} from '../../utils/psp';

const func: DeployFunction = async function (hre: EHRE) {
  const {ethers, network, getNamedAccounts} = hre;
  const {deployer} = await getNamedAccounts();

  if (network.name !== 'localhost' && network.name !== 'hardhat') {
    if (
      !('MANAGINGDAO_MULTISIG_LISTEDONLY' in process.env) ||
      !('MANAGINGDAO_MULTISIG_MINAPPROVALS' in process.env) ||
      !('MANAGINGDAO_MULTISIG_APPROVERS' in process.env)
    ) {
      throw new Error('Managing DAO Multisig settings not set in .env');
    }
  }

  const approvers = process.env.MANAGINGDAO_MULTISIG_APPROVERS?.split(',') || [
    deployer,
  ];
  const minApprovals = parseInt(
    process.env.MANAGINGDAO_MULTISIG_MINAPPROVALS || '1'
  );
  // In case `MANAGINGDAO_MULTISIG_LISTEDONLY` not present in .env
  // which applies only hardhat/localhost, use `true` setting for extra safety for tests.
  const listedOnly =
    'MANAGINGDAO_MULTISIG_LISTEDONLY' in process.env
      ? process.env.MANAGINGDAO_MULTISIG_LISTEDONLY === 'true'
      : true;

  // Get `managingDAO` address.
  const managingDAOAddress = await getContractAddress('DAO', hre);

  // Get `DAO` contract.
  const managingDaoContract = await ethers.getContractAt(
    'DAO',
    managingDAOAddress
  );

  // Get `PluginSetupProcessor` address.
  const pspAddress = await getContractAddress('PluginSetupProcessor', hre);

  // Get `PluginSetupProcessor` contract.
  const pspContract = await ethers.getContractAt(
    'PluginSetupProcessor',
    pspAddress
  );

  // Installing multisig
  const multisigRepoAddress = hre.aragonPluginRepos.multisig;
  const versionTag = [1, 1];
  const pluginSetupRef = [versionTag, multisigRepoAddress];

  // Prepare multisig plugin for managingDAO
  const data = ethers.utils.defaultAbiCoder.encode(
    buildMetadataJson.pluginSetupABI.prepareInstallation,
    [approvers, [listedOnly, minApprovals]]
  );
  const prepareParams = [pluginSetupRef, data];
  const prepareTx = await pspContract.prepareInstallation(
    managingDAOAddress,
    prepareParams
  );
  await prepareTx.wait();

  // extract info from prepare event
  const event = await findEvent(prepareTx, 'InstallationPrepared');
  const installationPreparedEvent = event.args;

  hre.managingDAOMultisigPluginAddress = installationPreparedEvent.plugin;

  console.log(
    `Prepared (Multisig: ${installationPreparedEvent.plugin}) to be applied on (ManagingDAO: ${managingDAOAddress}), see (tx: ${prepareTx.hash})`
  );

  // Apply multisig plugin to the managingDAO
  const applyParams = [
    pluginSetupRef,
    installationPreparedEvent.plugin,
    installationPreparedEvent.preparedSetupData.permissions,
    hashHelpers(installationPreparedEvent.preparedSetupData.helpers),
  ];
  const applyTx = await pspContract.applyInstallation(
    managingDAOAddress,
    applyParams
  );
  await applyTx.wait();

  await checkPermission(managingDaoContract, {
    operation: Operation.Grant,
    where: {name: 'ManagingDAO', address: managingDAOAddress},
    who: {name: 'Multisig plugin', address: installationPreparedEvent.plugin},
    permission: 'EXECUTE_PERMISSION',
  });

  console.log(
    `Applied (Multisig: ${installationPreparedEvent.plugin}) on (ManagingDAO: ${managingDAOAddress}), see (tx: ${applyTx.hash})`
  );
};
export default func;
func.tags = ['InstallMultisigOnManagingDAO'];
