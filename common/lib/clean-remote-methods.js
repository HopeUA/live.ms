export default function(Model) {
    Model.on('attached', (app) => {
        app.on('started', () => {
            Model.sharedClass.methods().forEach((m) => {
                if (m.name.search(/^__/) !== -1) {
                    const name = m.isStatic ? m.name : `prototype.${m.name}`;
                    Model.disableRemoteMethodByName(name);
                }
            });
            Model.sharedClass.methods().forEach((m) => {
                console.log(m.name, m.isStatic);
            });
        });
    });
}
