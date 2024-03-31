module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-nesting')({
			edition: '2024-02',
		}),
	],
}
