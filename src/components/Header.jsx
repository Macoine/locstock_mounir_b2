import { Button } from "@/components/Button";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <div>
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div>
              <Image src="/logo.png" alt="logo" width={50} height={50} />
            </div>
            <div>
              <h1 className="text-2xl font-bold cursor-pointer flex items-center">
                LOCKSTOCK
              </h1>
            </div>
          </div>
        </Link>
      </div>

      <div>
        <Link href="/locations/create">
          <Button variant="primary">Create</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
