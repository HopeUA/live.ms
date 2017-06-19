import Acl from 'common/lib/acl';
import RemoteMethod from 'common/lib/remote-method';
import createError from 'http-errors';

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
                    description: 'Channel id',
                    required: true,
                    http: { source: 'path' }
                }
            ]
        };
    }

    before() {
        return async (ctx) => {
            if (!Acl.isGranted(ctx.req.user, 'channels:write')) {
                throw new createError.Unauthorized();
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
