import Document, { Html, Head, Main, NextScript } from 'next/document';
import classNames from "classnames";
export default class MyDocument extends Document {
    render() {
        const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
        
        return (
            <Html>
                <Head />
                <body className={classNames("font-body subpixel-antialiased bg-gray-900 overflow-x-hidden")}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}