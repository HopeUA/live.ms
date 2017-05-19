import Acl from 'common/lib/acl';
import RemoteMethod from 'common/lib/remote-method';

class CreateStream extends RemoteMethod {
    get name() {
        return 'createStream';
    }

    config() {
        return {
            http: {
                verb: 'post',
                path: '/streams'
            },
            accepts: {
                arg: 'data',
                type: 'object',
                http: { source: 'body' }
            },
            returns: {
                type: 'Stream',
                root: true
            },
            isStatic: false
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
        return async function (data) {
            const channel = this;
            await channel.streams$.create(data);

            return channel;
        };
    }

    after() {
        return async (ctx) => {
            ctx.res.statusCode = 201;
        };
    }
}

export default CreateStream;
