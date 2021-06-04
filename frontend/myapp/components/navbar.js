import {Navbar , Nav} from 'react-bootstrap'
import Link from 'next/link'

export default function NavBar() {
    return (
        <Navbar>
            <Navbar.Brand href="/test">Monoalbum</Navbar.Brand>
            <Nav>
                <Nav.Link href="/test">
                    Home
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}