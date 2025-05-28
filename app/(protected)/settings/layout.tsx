import { Navbar } from "@/app/(protected)/settings/_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const SettingsLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
export default SettingsLayout;