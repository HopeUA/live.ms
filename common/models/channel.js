import * as RemoteMethods from './channel/index';
import applyRemoteMethods from 'common/lib/apply-remote-methods';

module.exports = (Channel) => {
    Channel.on('attached', (app) => {
        app.on('started', () => {
            Channel.sharedClass.methods().forEach((m) => {
                console.log(m.name);
            });
        });
    });

    applyRemoteMethods(Channel, RemoteMethods);
};
