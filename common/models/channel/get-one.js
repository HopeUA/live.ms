import RemoteMethod from 'common/lib/remote-method';

class GetOne extends RemoteMethod {
    get name() {
        return 'getOne';
    }

    config() {
        return {
            http: {
                verb: 'get',
                path: '/:id'
            },
            accepts: [
                {
                    arg: 'id',
                    type: 'String'
                }
            ],
            returns: {
                type: 'Channel',
                root: true
            }
        };
    }

    remote() {
        return async (id) => {
            const channel = await this.model.findById(id);

            return channel;
        };
    }
}

export default GetOne;
