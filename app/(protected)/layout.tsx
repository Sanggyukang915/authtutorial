interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                {children}
            </div>
        </div>
    )
}
export default ProtectedLayout;