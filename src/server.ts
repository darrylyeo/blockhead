import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

import dotenv from 'dotenv'
dotenv.config()

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				const {
					INFURA_PROJECT_ID,
					POCKET_NETWORK_PPK,
					POCKET_NETWORK_PASSPHRASE,
					COVALENT_API_KEY,
					ZAPPER_API_KEY,
					TORUS_PROJECT_ID,
					TORUS_OPENLOGIN_SECRET,
					...others
				} = process.env
				return {
					env: {
						INFURA_PROJECT_ID,
						POCKET_NETWORK_PPK,
						POCKET_NETWORK_PASSPHRASE,
						COVALENT_API_KEY,
						ZAPPER_API_KEY,
						TORUS_PROJECT_ID,
						TORUS_OPENLOGIN_SECRET,
						...others
					}
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
