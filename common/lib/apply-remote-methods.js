export default function(Model, RemoteMethods) {
    Object.keys(RemoteMethods).forEach((id) => {
        const RemoteMethod = RemoteMethods[id];
        const remote = new RemoteMethod(Model);
        const config = remote.config();

        Model.remoteMethod(remote.name, config);
        Model.beforeRemote(remote.name, remote.before());
        if (config.isStatic) {
            Model[remote.name] = remote.remote();
        } else {
            Model.prototype[remote.name] = remote.remote();
        }
        Model.afterRemote(remote.name, remote.after());
    });
}
