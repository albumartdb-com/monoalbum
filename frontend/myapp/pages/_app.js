import Head from 'next/head'
import {Card, Nav,Navbar} from 'react-bootstrap'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossorigin="anonymous" 
        />
        <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"></script>
      </Head>

      <Navbar>
        <Navbar.Brand href="/">Monoalbum</Navbar.Brand>
        <Nav>
            <Nav.Link href="/test">
                Home
            </Nav.Link>
        </Nav>
      </Navbar>

      <Component {...pageProps} />

      <Card.Footer>
        This is the footer
      </Card.Footer>
    </>
  )
}

export default MyApp
