import Acl from 'common/lib/acl';
import RemoteMethod from 'common/lib/remote-method';

class CreateOne extends RemoteMethod {
    get name() {
        return 'createOne';
    }

    config() {
        return {
            http: {
                verb: 'post',
                path: '/'
            },
            accepts: {
                arg: 'data',
                type: 'object',
                http: { source: 'body' }
            },
            returns: {
                arg: 'data',
                type: 'Channel',
                root: true
            }
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
        return async (data) => {
            const Channel = this.model;

            // TODO Валидация данных
            const channel = new Channel(data);
            await Channel.create(channel);

            return channel;
        };
    }

    after() {
        return async (ctx) => {
            ctx.res.statusCode = 201;
        };
    }
}

export default CreateOne;
