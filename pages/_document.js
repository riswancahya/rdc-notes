import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html dir="ltr" lang="id">
				<Head></Head>
				<body>
                    <Main />
                    <NextScript />
				</body>
			</Html>
		)
	}
}