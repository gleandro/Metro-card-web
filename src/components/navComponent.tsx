import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Link from 'next/link'
import {getSession, removeSession} from "@/services/session";
import {useRouter} from "next/navigation";
import {Avatar} from "@mui/material";

export default function NavComponent() {

    const router = useRouter();

    const userSession = getSession("userSession");
    console.log(userSession)

    const logout = () => {
        removeSession("userSession");
        router.refresh();
    }

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 24, height: 24
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const stringToColor = (string: string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }


    return (
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
                        <Avatar {...stringAvatar(userSession.name + ' ' + userSession.lastName)} />
                        <strong className="ms-2">{userSession.name}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="#">Perfil</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" onClick={logout}>Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
            <div className="b-example-divider b-example-vr"></div>
        </main>
    )
}