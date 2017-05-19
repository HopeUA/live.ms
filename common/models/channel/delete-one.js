import Acl from 'common/lib/acl';
import RemoteMethod from 'common/lib/remote-method';

class DeleteOne extends RemoteMethod {
    get name() {
        return 'deleteOne';
    }

    config() {
        return {
            http: {
                verb: 'del',
                path: '/:id'
            },
            accepts: [
                {
                    arg: 'id',
                    type: 'any',
                    description: 'Model id',
                    required: true,
                    http: { source: 'path' }
                }
            ]
        };
    }

    before() {
        return async (ctx) => {
            if (!Acl.isGranted(ctx.req.user, 'channels:write')) {
                const error = new Error('Access denied');
                error.statusCode = 401;
                throw error;
            }
        }
    }

    remote() {
        return async (id) => {
            await this.model.deleteById(id);
        };
    }

    after() {
        return async (ctx) => {
            ctx.res.statusCode = 204;
        };
    }
}

export default DeleteOne;
