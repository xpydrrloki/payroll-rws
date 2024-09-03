import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/logo2.png";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="items-center">
      <Image
        src={logo}
        alt="logo"
        height={34}
        className=""
        draggable={false}
      />
    </div>
  );
};

export default Logo;
