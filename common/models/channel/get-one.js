import Acl from 'common/lib/acl';
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

    before() {
        return async (ctx) => {
            if (!Acl.isGranted(ctx.req.user, 'channels:read')) {
                const error = new Error('Access denied');
                error.statusCode = 401;
                throw error;
            }
        }
    }

    remote() {
        return async (id) => {
            const channel = await this.model.findById(id);

            return channel;
        };
    }
}

export default GetOne;
