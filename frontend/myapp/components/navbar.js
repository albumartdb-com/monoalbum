import {Navbar , Nav} from 'react-bootstrap'
import Link from 'next/link'

export default function NavBar() {
    return (
        <Navbar>
            <Navbar.Brand href="/">albumartdb</Navbar.Brand>
            <Nav>
                <Nav.Link href="/about">
                    About
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}