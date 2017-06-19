import * as RemoteMethods from './channel/index';
import cleanRemoteMethods from 'common/lib/clean-remote-methods';
import applyRemoteMethods from 'common/lib/apply-remote-methods';

module.exports = (Channel) => {
    cleanRemoteMethods(Channel);
    applyRemoteMethods(Channel, RemoteMethods);
};
