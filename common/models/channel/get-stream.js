import RemoteMethod from 'common/lib/remote-method';
import createError from 'http-errors';

class GetStream extends RemoteMethod {
    get name() {
        return 'getStream';
    }

    config() {
        return {
            http: {
                verb: 'get',
                path: '/:id/streams'
            },
            accepts: [
                {
                    arg: 'id',
                    type: 'String'
                },
                {
                    arg: 'type',
                    type: 'String'
                }
            ],
            returns: {
                type: 'string',
                root: true
            }
        };
    }

    remote() {
        return async (id, type) => {
            console.log(id, type);

            const channel = await this.model.findById(id);
            if (!channel) {
                throw new createError.NotFound();
            }


            const stream = channel.streams.find((stream) => {
                return stream.type === type;
            });
            if (!stream) {
                throw new createError.NotFound();
            }

            return stream.url;
        };
    }

    after() {
        return async (ctx) => {
            ctx.res.setHeader('Content-Type', 'text/plain');
            ctx.res.end(ctx.result);
        };
    }
}

export default GetStream;
