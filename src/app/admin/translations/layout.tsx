import { TranslationProvider } from "@/context/TranslationContext";
import {PropsWithChildren} from "react";

const Layout = ({children}: PropsWithChildren) => {
    return (
      <div>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </div>
    )
}
export default Layout;