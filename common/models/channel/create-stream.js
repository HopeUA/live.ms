import Acl from 'common/lib/acl';
import RemoteMethod from 'common/lib/remote-method';
import createError from 'http-errors';

class CreateStream extends RemoteMethod {
    get name() {
        return 'createStream';
    }

    config() {
        return {
            http: {
                verb: 'post',
                path: '/:id/streams'
            },
            accepts: [
                {
                    arg: 'id',
                    type: 'String',
                    http: { source: 'path' }
                },
                {
                    arg: 'data',
                    type: 'object',
                    http: { source: 'body' }
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
            if (!Acl.isGranted(ctx.req.user, 'channels:write')) {
                throw new createError.Unauthorized();
            }
        }
    }

    remote() {
        return async (id, data) => {
            const channel = await this.model.findById(id);
            if (!channel) {
                throw new createError.NotFound();
            }

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
