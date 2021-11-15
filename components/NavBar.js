import Link from "next/Link";
import Image from "next/Image";
import logo from "../public/console.png";
const Navbar = ({ account }) => {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link href="/">
          <Image src={logo} alt={"Logo"} width={100} height={100}></Image>
        </Link>
      </div>
      <div className="account-info">
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar.url} />
      </div>
    </div>
  );
};
export default Navbar;
