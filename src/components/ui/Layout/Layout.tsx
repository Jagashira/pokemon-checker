import { ReactElement } from "react";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

type LayoutProps = Required<{
    readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
    <>
        <div className="fixed top-0 z-50 w-full">
            <Header />
        </div>
        <div
            style={{ backgroundColor: `white` }}

        >
            {children}
        </div>
        <Footer />
    </>
);