class RemoteMethod {
    constructor(model) {
        this.model = model;
    }

    get name() {
        return 'default';
    }

    config() {
        return {};
    }

    before() {
        return async () => {};
    }

    remote() {
        return () => {
            return {};
        };
    }

    after() {
        return async () => {};
    }
}

export default RemoteMethod;
