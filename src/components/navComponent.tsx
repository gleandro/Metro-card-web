import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Link from 'next/link'
import Image from "next/image";

export default function NavComponent() {
    return (
        <>
            <main className="d-flex flex-nowrap">
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px"}}>
                    <a href="/"
                       className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <svg className="bi pe-none me-2" width="40" height="32">
                            <use xlinkHref={"#bootstrap"}/>
                        </svg>
                        <span className="fs-4">MetroCard</span>
                    </a>
                    <hr/>
                    <ul className="nav nav-pills flex-column mb-auto">

                        <li className="nav-item">
                            <Link href="/" className="nav-link link-body-emphasis">
                                <HomeIcon/> Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href={"/recarga"} className="nav-link link-body-emphasis">
                                <AttachMoneyIcon/> Recarga
                            </Link>
                        </li>
                        <li>
                            <Link href={"/transferencia"} className="nav-link link-body-emphasis">
                                <CompareArrowsIcon/> Transferencia
                            </Link>
                        </li>
                    </ul>
                    <hr/>
                    <div className="dropdown">
                        <a href="#"
                           className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src="https://github.com/mdo.png" alt="" width="32" height="32"
                                   className="rounded-circle me-2"/>
                            <strong>mdo</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
                <div className="b-example-divider b-example-vr"></div>
            </main>
        </>

    )
}